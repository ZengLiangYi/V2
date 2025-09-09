// 配置管理模块
class ConfigManager {
    constructor() {
        this.configs = new Map();
        this.loadConfigs();
    }

    loadConfigs() {
        this.configs.set('electrical', {
            name: 'V3视觉设计工程师',
            initialPoints: 999,
            containerSize: { width: '60rem', height: '100rem' },
            nodes: {
                "NM01": {
                    id: "NM01",
                    name: "NM01",
                    description: "正确识别、使用工具、量具",
                    cost: 1,
                    position: { x: 0, y: 1260 },
                    icon: "img/icons/V3视觉设计工程师/NM01.png",
                    prerequisites: []
                },
                "NM02": {
                    id: "NM02",
                    name: "NM02",
                    description: "正确识别、使用耗材",
                    cost: 1,
                    position: { x: 170, y: 1260 },
                    icon: "img/icons/V3视觉设计工程师/NM02.png",
                    prerequisites: []
                },
                "NM04": {
                    id: "NM04",
                    name: "NM04",
                    description: "正确认识并掌握设备元件装配方法及技巧",
                    cost: 1,
                    position: { x: 0, y: 1020 },
                    icon: "img/icons/V3视觉设计工程师/NM04.png",
                    prerequisites: ["NM01", "NM02"]
                },
                "NM05": {
                    id: "NM05",
                    name: "NM05",
                    description: "根据2D/3D图纸完成整机机械装配",
                    cost: 1,
                    position: { x: 170, y: 1020 },
                    icon: "img/icons/V3视觉设计工程师/NM05.png",
                    prerequisites: []
                },
                "NE01": {
                    id: "NE01",
                    name: "NE01",
                    description: "正确使用电工工具、量具",
                    cost: 1,
                    position: { x: 340, y: 1260 },
                    icon: "img/icons/V3视觉设计工程师/NE01.png",
                    prerequisites: []
                },
                "NE02": {
                    id: "NE02",
                    name: "NE02",
                    description: "正确使用电气元件",
                    cost: 1,
                    position: { x: 510, y: 1260 },
                    icon: "img/icons/V3视觉设计工程师/NE02.png",
                    prerequisites: []
                },
                "NE03": {
                    id: "NE03",
                    name: "NE03",
                    description: "正确识别电路图",
                    cost: 1,
                    position: { x: 680, y: 1260 },
                    icon: "img/icons/V3视觉设计工程师/NE03.png",
                    prerequisites: []
                },
                "NE05": {
                    id: "NE05",
                    name: "NE05",
                    description: "能进行电路故障分析和排查",
                    cost: 1,
                    position: { x: 510, y: 1020 },
                    icon: "img/icons/V3视觉设计工程师/NE05.png",
                    prerequisites: ["NE01","NE02","NE03"]
                },
                "NV01": {
                    id: "NV01",
                    name: "NV01",
                    description: "可正确安装视觉系统硬件(相机/镜头/光源)",
                    cost: 1,
                    position: { x: 645, y: 1020 },
                    icon: "img/icons/V3视觉设计工程师/NV01.png",
                    prerequisites: []
                },
                "NV02": {
                    id: "NV02", 
                    name: "NV02",
                    description: "可正确设置联网通信",
                    cost: 1,
                    position: { x: 780, y: 1020 },
                    icon: "img/icons/V3视觉设计工程师/NV02.png",
                    prerequisites: []
                },
                "NV03": {
                    id: "NV03",
                    name: "NV03", 
                    description: "会调整位置、光源等参数，保证图像清晰度",
                    cost: 1,
                    position: { x: 915, y: 1020 },
                    icon: "img/icons/V3视觉设计工程师/NV03.png",
                    prerequisites: []
                },
                "NV04": {
                    id: "NV04",
                    name: "NV04",
                    description: "会结合产线具体生产工艺和客户要求，调整软件设置",
                    cost: 2,
                    position: { x: 680, y: 780 },
                    icon: "img/icons/V3视觉设计工程师/NV04.png", 
                    prerequisites: ["NV01", "NV02", "NV03"]
                },
                "NV05": {
                    id: "NV05",
                    name: "NV05",
                    description: "基础沟通与协作能力",
                    cost: 1,
                    position: { x: 850, y: 780 },
                    icon: "img/icons/V3视觉设计工程师/NV05.png",
                    prerequisites: []
                },
                "NV06": {
                    id: "NV06",
                    name: "NV06",
                    description: "能熟练进行点位调试",
                    cost: 2,
                    position: { x: 0, y: 780 },
                    icon: "img/icons/V3视觉设计工程师/NV06.png",
                    prerequisites: []
                },
                "NV07": {
                    id: "NV07",
                    name: "NV07",
                    description: "能进行相机标定(标定图像和图像，图像和物理量的联系)",
                    cost: 3,
                    position: { x: 170, y: 780 },
                    icon: "img/icons/V3视觉设计工程师/NV07.png",
                    prerequisites: []
                },
                "NV08": {
                    id: "NV08",
                    name: "NV08",
                    description: "能调试视觉程序，并排除故障",
                    cost: 3,
                    position: { x: 0, y: 540 },
                    icon: "img/icons/V3视觉设计工程师/NV08.png",
                    prerequisites: ["NV06","NV07"]
                },
                "NV09": {
                    id: "NV09",
                    name: "NV09",
                    description: "能验证视觉设备的性能指标，并优化",
                    cost: 3,
                    position: { x: 170, y: 540 },
                    icon: "img/icons/V3视觉设计工程师/NV09.png",
                    prerequisites: ["NV08"]
                },
                "NV10": {
                    id: "NV10",
                    name: "NV10",
                    description: "会备份/还原相关设置",
                    cost: 3,
                    position: { x: 340, y: 540 },
                    icon: "img/icons/V3视觉设计工程师/NV10.png",
                    prerequisites: []
                },
                "NV11": {
                    id: "NV11",
                    name: "NV11",
                    description: "现场管理与沟通能力",
                    cost: 3,
                    position: { x: 510, y: 540 },
                    icon: "img/icons/V3视觉设计工程师/NV11.png",
                    prerequisites: []
                },
                "NV12": {
                    id: "NV12",
                    name: "NV12",
                    description: "能独立完成视觉硬件选型",
                    cost: 3,
                    position: { x: 0, y: 300 },
                    icon: "img/icons/V3视觉设计工程师/NV12.png",
                    prerequisites: []
                },
                "NV13": {
                    id: "NV13",
                    name: "NV13",
                    description: "能完成与上位机PLC/机器人等设备的通讯连接",
                    cost: 3,
                    position: { x: 170, y: 300 },
                    icon: "img/icons/V3视觉设计工程师/NV13.png",
                    prerequisites: []
                },
                "NV14": {
                    id: "NV14",
                    name: "NV14",
                    description: "能独立编写/测试/debug视觉程序",
                    cost: 3,
                    position: { x: 340, y: 300 },
                    icon: "img/icons/V3视觉设计工程师/NV14.png",
                    prerequisites: []
                },
                "NV15": {
                    id: "NV15",
                    name: "NV15",
                    description: "能完成技术文件的编写",
                    cost: 3,
                    position: { x: 680, y: 300 },
                    icon: "img/icons/V3视觉设计工程师/NV15.png",
                    prerequisites: []
                },
                "NV16": {
                    id: "NV16",
                    name: "NV16",
                    description: "能与客户良好沟通",
                    cost: 3,
                    position: { x: 850, y: 300 },
                    icon: "img/icons/V3视觉设计工程师/NV16.png",
                    prerequisites: []
                },
                "视觉调试": {
                    id: "视觉调试",
                    name: "视觉调试",
                    description: "视觉调试",
                    cost: 3,
                    position: { x: 510, y: 300 },
                    icon: "img/icons/V3视觉设计工程师/视觉调试.png",
                    prerequisites: ["NV09","NV10","NV11","视觉运维"]
                },
                "视觉运维": {
                    id: "视觉运维",
                    name: "视觉运维",
                    description: "视觉运维",
                    cost: 3,
                    position: { x: 680, y: 540 },
                    icon: "img/icons/V3视觉设计工程师/视觉运维.png",
                    prerequisites: ["机械装配","电气装配","NV04","NV05"]
                },
                "机械装配": {
                    id: "机械装配",
                    name: "机械装配",
                    description: "机械装配",
                    cost: 3,
                    position: { x: 340, y: 780 },
                    icon: "img/icons/V3视觉设计工程师/机械装配.png",
                    prerequisites: ["NM04","NM05"]
                },
                "电气装配": {
                    id: "电气装配",
                    name: "电气装配",
                    description: "电气装配",
                    cost: 3,
                    position: { x: 510, y: 780 },
                    icon: "img/icons/V3视觉设计工程师/电气装配.png",
                    prerequisites: ["NE05"]
                },
                "V3视觉设计工程师": {
                    id: "V3视觉设计工程师",
                    name: "V3视觉设计<br>工程师",
                    description: "V3视觉设计工程师",
                    cost: 3,
                    position: { x: 400, y: 0 },
                    icon: "img/icons/V3视觉设计工程师/V3视觉设计工程师.png",
                    prerequisites: ["NV12", "NV13", "NV15"]
                }
            },
            connections: [
                { from: "NM01", to: "NM04", style: "tree" },
                { from: "NM02", to: "NM04", style: "tree" },
                { from: "NM04", to: "机械装配", style: "tree" },
                { from: "NM05", to: "机械装配", style: "tree" },
                { from: "NE01", to: "NE05", style: "tree" },
                { from: "NE02", to: "NE05", style: "tree" },
                { from: "NE03", to: "NE05", style: "tree" },
                { from: "NE05", to: "电气装配", style: "direct" },
                { from: "NV08", to: "NV09", style: "direct" },
                { from: "NV01", to: "NV04", style: "tree" },
                { from: "NV02", to: "NV04", style: "tree" },
                { from: "NV03", to: "NV04", style: "tree" },
                { from: "机械装配", to: "视觉运维", style: "tree" },
                { from: "电气装配", to: "视觉运维", style: "tree" },
                { from: "NV04", to: "视觉运维", style: "tree" },
                { from: "NV05", to: "视觉运维", style: "tree" },
                { from: "NV06", to: "NV08", style: "tree" },
                { from: "NV07", to: "NV08", style: "tree" },
                { from: "NV09", to: "视觉调试", style: "tree" },
                { from: "NV10", to: "视觉调试", style: "tree" },
                { from: "NV11", to: "视觉调试", style: "tree" },
                { from: "视觉运维", to: "视觉调试", style: "tree" },
                { from: "NV12", to: "V3视觉设计工程师", style: "tree" },
                { from: "NV13", to: "V3视觉设计工程师", style: "tree" },
                { from: "NV14", to: "V3视觉设计工程师", style: "tree" },
                { from: "NV15", to: "V3视觉设计工程师", style: "tree" },
                { from: "NV16", to: "V3视觉设计工程师", style: "tree" },
                { from: "视觉调试", to: "V3视觉设计工程师", style: "tree" },
            ]
        });
    }

    getConfig(type) {
        const config = this.configs.get(type);
        if (!config) {
            throw new Error(`未找到配置类型: ${type}`);
        }
        return config;
    }

    validateConfig(config) {
        const errors = [];
        
        // 验证节点
        for (const [nodeId, node] of Object.entries(config.nodes)) {
            if (!node.position || typeof node.position.x !== 'number' || typeof node.position.y !== 'number') {
                errors.push(`节点 ${nodeId} 缺少有效的位置坐标`);
            }
            if (!node.name || !node.description) {
                errors.push(`节点 ${nodeId} 缺少名称或描述`);
            }
            if (typeof node.cost !== 'number' || node.cost < 0) {
                errors.push(`节点 ${nodeId} 技能点消耗无效`);
            }
        }
        
        // 验证连接
        for (const connection of config.connections) {
            if (!config.nodes[connection.from]) {
                errors.push(`连接中的起始节点 ${connection.from} 不存在`);
            }
            if (!config.nodes[connection.to]) {
                errors.push(`连接中的目标节点 ${connection.to} 不存在`);
            }
        }
        
        return errors;
    }

    generateHTML(config) {
        let html = `<div class="skill-tree-container">`;
        html += `<canvas id="connectionCanvas" class="connection-canvas"></canvas>`;
        
        // 生成技能节点
        for (const [nodeId, node] of Object.entries(config.nodes)) {
            const isFinalMaster = node.id === 'V3视觉设计工程师' || node.id === '机械设计工程师' || node.id === '视觉设计工程师';
            const masterClass = isFinalMaster ? ' final-master' : '';
            
            html += `
                <div class="skill-node${masterClass}" 
                     data-skill="${node.id}" 
                     data-cost="${node.cost}" 
                     data-prerequisites="${node.prerequisites.join(',')}"
                     style="position: absolute; left: ${node.position.x}px; top: ${node.position.y}px;">
                    <div class="skill-icon">
                        <img src="${node.icon}" alt="${node.name}">
                        ${isFinalMaster ? `<div class="skill-name">${node.name}</div>` : ''}
                    </div>
                    ${!isFinalMaster ? `<div class="skill-name">${node.name}</div>` : ''}
                    <div class="skill-description">${node.description}</div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
}

// 导出配置管理器
window.ConfigManager = ConfigManager;
