
/**
 * 绘制land的网格 
 * x轴  1024 
 * y轴  1024 
 * 
 * 每个格子size:10
 * x轴 总共: 100个格子
 * y轴 总共: 100个格子
 * 
 * 1个land总共可以种植 10000个树
 * 
 * @returns 
 */

import { LandClickType } from "~~/pages/lands";

export function getTranslateY(){
    return 30;
}

export function gridLines() {
    const lines = [];

    for (let i = 0; i <= 100; i++) {
        lines.push(
            <line x1={i * 10} y1={getTranslateY()} x2={i * 10} y2={1000+getTranslateY()} stroke="#000000" strokeWidth={0.2} ></line>
        );
    }

    for (let i = 0; i <= 100; i++) {
        lines.push(
            <line x1={0} y1={i * 10+getTranslateY()} x2={1000} y2={i * 10+getTranslateY()} stroke="#000000" strokeWidth={0.2} ></line>
        );
    }

    return lines;
}

export function gridBoxColor(callback:LandClickType) {
    const colors = [];

    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            const blueReducedHue = (x / (100 - 1)) * 60; // 0 到 60 范围的色相值
            const h = 120 + blueReducedHue; // 在
            // const h = (x / 110-1) * 360;  
            const saturation = 41;
            const lightness = 40;
            colors.push(
                <rect onClick={(event)=>callback(x,y)}
                    x={0.25 + x * 10} y={0.25 + y * 10+getTranslateY()} width="9.5" height="9.5" fill={`hsl(${h}, ${saturation}%, ${lightness}%)`} opacity="1" ></rect>
            )
        }
    }


    return colors;
}