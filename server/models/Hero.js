const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {type: String},
	avatar: {type: String},
	banner: {type: String},
	
	title: {type: String},/* 称号 */
	
	categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],	/* 定位 */
	
	scores: {		/* 难度等 */
		difficult: {type: Number}, /* 难度 */
		skills: {type: Number},	/* 技能 */
		attack: {type: Number},	/* 攻击 */
		survive: {type: Number}	/* 生存 */
	},
	
	skills: [{	/* 技能 */
		icon: {type: String},	/* 图标 */
		name: {type: String},	/* 名称 */
		delay: {type: String},	/* 冷却值 */
		cost: {type: String},	/* 消耗 */
		description: {type: String},	/* 技能介绍 */
		tips: {type: String}	/* 技能提示 */
	}],
	
	items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],/* 顺风推荐出装，关联装备 */
	items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],/* 逆风推荐出装，关联装备 */
	
	usageTips: {type: String},	/* 使用技巧 */
	
	battleTips: {type: String},	/* 对抗技巧 */
	
	teamTips: {type: String},	/* 团战思路 */
	
	partners: [{	/* 英雄关系， 最佳搭档 */
		hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
		description: {type: String}
	}],
})

module.exports = mongoose.model('Hero', schema, 'heroes')