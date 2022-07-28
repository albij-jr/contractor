import { ReactNode } from "react";

export interface MetaElement {
    name        ?: string,
    description ?: string
}

export interface MetaHeaderProps{
    meta : Array<Record<string,string | number>>,
    title?: string,
    children ?: ReactNode
}