declare var __DEV__: boolean

declare type CanvasCtx = CanvasRenderingContext2D

declare type CanvasCache = Record<string, HTMLCanvasElement>

declare type RawColorData = [number, number, number] | [number, number, number, number];
declare type RgbColorString = `rgb(${number},${number},${number})`
declare type RgbaColorString = `rgba(${number},${number},${number},${number})`
