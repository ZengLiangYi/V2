// 技能树核心类
class SkillTree {
    constructor(treeType = 'electrical') {
        this.treeType = treeType;
        this.configManager = new ConfigManager();
        this.config = this.configManager.getConfig(treeType);
        this.availablePoints = this.config.initialPoints;
        this.unlockedSkills = new Set();
        this.storageKey = `skillTree_${treeType}`;
        
        // Canvas相关
        this.canvas = null;
        this.ctx = null;
        this.connections = [];
        
        // UI元素
        this.tooltip = null;
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.setupCanvas();
        this.setupEventListeners();
        this.updateSkillAvailability();
        this.createTooltip();
        this.buildConnectionMap();
        this.drawConnections();
    }

    setupEventListeners() {
        // 技能节点点击
        document.querySelectorAll('.skill-node').forEach(node => {
            node.addEventListener('click', (e) => {
                this.handleSkillClick(e.currentTarget);
            });

            // 鼠标悬停显示详细信息
            node.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.currentTarget, e);
            });

            node.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });

            node.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
        });

        // 重置按钮
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetSkillTree();
            });
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.resetSkillTree();
            }
        });

        // 窗口大小改变时重新绘制连接线
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.drawConnections();
        });
    }

    setupCanvas() {
        this.canvas = document.getElementById('connectionCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        
        // 设置Canvas尺寸
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // 高DPI支持
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        this.ctx.scale(dpr, dpr);
    }

    buildConnectionMap() {
        this.connections = [];
        
        this.config.connections.forEach(conn => {
            const fromNode = document.querySelector(`[data-skill="${conn.from}"]`);
            const toNode = document.querySelector(`[data-skill="${conn.to}"]`);
            
            if (fromNode && toNode) {
                this.connections.push({
                    from: fromNode,
                    to: toNode,
                    fromId: conn.from,
                    toId: conn.to,
                    style: conn.style || 'tree'
                });
            }
        });
    }

    getNodePosition(node) {
        const container = this.canvas.parentElement;
        const containerRect = container.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        
        return {
            x: nodeRect.left - containerRect.left + nodeRect.width / 2,
            y: nodeRect.top - containerRect.top + nodeRect.height / 2
        };
    }

    drawConnections() {
        if (!this.ctx || !this.canvas) return;
        
        // 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.connections.forEach(connection => {
            const fromPos = this.getNodePosition(connection.from);
            const toPos = this.getNodePosition(connection.to);
            
            // 判断连接线状态
            const fromUnlocked = this.unlockedSkills.has(connection.fromId);
            const toUnlocked = this.unlockedSkills.has(connection.toId);
            
            this.drawConnection(fromPos, toPos, fromUnlocked, toUnlocked, connection.style);
        });
    }

    drawConnection(fromPos, toPos, fromUnlocked, toUnlocked, style = 'tree') {
        const ctx = this.ctx;
        
        // 设置连接线样式
        ctx.lineWidth = 4; // 从2px增加到4px，线条更粗
        ctx.lineCap = 'round';
        
        // 根据解锁状态设置颜色
        if (fromUnlocked && toUnlocked) {
            ctx.strokeStyle = 'white';
        } else if (fromUnlocked) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        }
        
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        
        // 根据样式绘制不同类型的连接线
        switch(style) {
            case 'direct':
                ctx.lineTo(toPos.x, toPos.y);
                break;
                
            case 'tree':
                const verticalOffset = 110; 
                const midY = fromPos.y - verticalOffset;
                
                ctx.lineTo(fromPos.x, midY);
                ctx.lineTo(toPos.x, midY);
                ctx.lineTo(toPos.x, toPos.y);
                break;
                
            case 'curve':
                const controlX = (fromPos.x + toPos.x) / 2;
                const controlY = (fromPos.y + toPos.y) / 2 - 50;
                ctx.quadraticCurveTo(controlX, controlY, toPos.x, toPos.y);
                break;
                
            default:
                ctx.lineTo(toPos.x, toPos.y);
        }
        
        ctx.stroke();
    }

    handleSkillClick(skillNode) {
        const skillId = skillNode.dataset.skill;
        const cost = parseInt(skillNode.dataset.cost);
        const prerequisites = skillNode.dataset.prerequisites.split(',').filter(p => p.trim());

        // 检查是否已解锁
        if (this.unlockedSkills.has(skillId)) {
            this.showMessage('该技能已经解锁！', 'info');
            return;
        }

        // 检查技能点是否足够
        if (this.availablePoints < cost) {
            this.showMessage(`技能点不足！需要 ${cost} 点，当前只有 ${this.availablePoints} 点`, 'error');
            return;
        }

        // 检查前置技能
        if (!this.checkPrerequisites(prerequisites)) {
            const missingSkills = prerequisites.filter(prereq => 
                !this.unlockedSkills.has(prereq.trim())
            );
            this.showMessage(`需要先解锁前置技能: ${missingSkills.join(', ')}`, 'error');
            return;
        }

        // 解锁技能
        this.unlockSkill(skillId, cost, skillNode);
    }

    checkPrerequisites(prerequisites) {
        if (prerequisites.length === 0 || prerequisites[0] === '') {
            return true;
        }

        return prerequisites.every(prereq => 
            this.unlockedSkills.has(prereq.trim())
        );
    }

    unlockSkill(skillId, cost, skillNode) {
        // 扣减技能点
        this.availablePoints -= cost;

        // 添加到已解锁技能
        this.unlockedSkills.add(skillId);

        // 更新视觉效果
        skillNode.classList.add('unlocked');

        // 更新技能可用性和连接线
        setTimeout(() => {
            this.updateSkillAvailability();
            this.drawConnections();
            this.saveProgress();
        }, 100);

        // 显示成功消息
        this.showMessage(`成功解锁 ${skillId}！消耗 ${cost} 技能点`, 'success');

        // 检查是否解锁了最终大师技能
        if (skillNode.classList.contains('final-master')) {
            setTimeout(() => {
                this.showMessage(`🎉 恭喜解锁大师级技能！`, 'success');
            }, 1000);
        }
    }

    updateSkillAvailability() {
        const skillNodes = document.querySelectorAll('.skill-node');

        skillNodes.forEach(node => {
            const skillId = node.dataset.skill;
            const prerequisites = node.dataset.prerequisites.split(',').filter(p => p.trim());

            // 重置状态
            node.classList.remove('available', 'unlocked');

            // 如果已解锁
            if (this.unlockedSkills.has(skillId)) {
                node.classList.add('unlocked');
            }
            // 如果满足前置条件
            else if (this.checkPrerequisites(prerequisites)) {
                node.classList.add('available');
            }
        });
    }

    resetSkillTree() {
        if (confirm('确定要重置技能树吗？这将清除所有已解锁的技能。')) {
            this.availablePoints = this.config.initialPoints;
            this.unlockedSkills.clear();

            // 重置所有技能节点的视觉状态
            document.querySelectorAll('.skill-node').forEach(node => {
                node.classList.remove('unlocked', 'available');
            });

            this.updateSkillAvailability();
            this.drawConnections();
            this.saveProgress();
            this.showMessage('技能树已重置！', 'success');
        }
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        document.body.appendChild(this.tooltip);
    }

    showTooltip(skillNode, event) {
        const skillId = skillNode.dataset.skill;
        const cost = skillNode.dataset.cost;
        const prerequisites = skillNode.dataset.prerequisites.split(',').filter(p => p.trim());
        const description = skillNode.querySelector('.skill-description').textContent;

        let tooltipContent = `<strong>${skillId}</strong><br>`;
        tooltipContent += `${description}<br>`;
        tooltipContent += `消耗: ${cost} 技能点<br>`;
        
        if (prerequisites.length > 0 && prerequisites[0] !== '') {
            tooltipContent += `前置技能: ${prerequisites.join(', ')}<br>`;
        }

        if (this.unlockedSkills.has(skillId)) {
            tooltipContent += `<span style="color: #4facfe;">✓ 已解锁</span>`;
        } else if (skillNode.classList.contains('available')) {
            tooltipContent += `<span style="color: #00f2fe;">可以解锁</span>`;
        } else {
            tooltipContent += `<span style="color: #ff6b6b;">需要满足前置条件</span>`;
        }

        this.tooltip.innerHTML = tooltipContent;
        this.tooltip.classList.add('show');
        this.updateTooltipPosition(event);
    }

    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.classList.remove('show');
        }
    }

    updateTooltipPosition(event) {
        if (!this.tooltip) return;

        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = event.clientX + 15;
        let top = event.clientY - tooltipRect.height - 15;

        // 防止超出边界
        if (left + tooltipRect.width > viewportWidth) {
            left = event.clientX - tooltipRect.width - 15;
        }

        if (top < 0) {
            top = event.clientY + 15;
        }

        if (top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - tooltipRect.height - 10;
        }

        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
    }

    showMessage(message, type = 'success') {
        // 移除现有消息
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = type === 'error' ? 'error-message' : 'success-message';
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        // 显示消息
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);

        // 自动隐藏消息
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }, 3000);
    }

    // 保存进度到本地存储
    saveProgress() {
        const saveData = {
            availablePoints: this.availablePoints,
            unlockedSkills: Array.from(this.unlockedSkills),
            timestamp: Date.now()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(saveData));
    }

    // 从本地存储加载进度
    loadProgress() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.availablePoints = data.availablePoints || this.config.initialPoints;
                this.unlockedSkills = new Set(data.unlockedSkills || []);
                
                // 恢复已解锁技能的视觉效果
                setTimeout(() => {
                    document.querySelectorAll('.skill-node').forEach(node => {
                        const skillId = node.dataset.skill;
                        if (this.unlockedSkills.has(skillId)) {
                            node.classList.add('unlocked');
                        }
                    });
                    this.updateSkillAvailability();
                    this.drawConnections();
                }, 100);
            } catch (error) {
                console.error('加载进度失败:', error);
            }
        }
    }

    // 获取技能树统计信息
    getTreeStats() {
        const totalSkills = document.querySelectorAll('.skill-node').length;
        const unlockedCount = this.unlockedSkills.size;
        const completionRate = Math.round((unlockedCount / totalSkills) * 100);
        
        return {
            total: totalSkills,
            unlocked: unlockedCount,
            completion: completionRate,
            remainingPoints: this.availablePoints
        };
    }
}

// 页面关闭前保存进度
window.addEventListener('beforeunload', () => {
    if (window.skillTree) {
        window.skillTree.saveProgress();
    }
});

// 定期保存进度
setInterval(() => {
    if (window.skillTree) {
        window.skillTree.saveProgress();
    }
}, 30000);

// 导出SkillTree类
window.SkillTree = SkillTree;
