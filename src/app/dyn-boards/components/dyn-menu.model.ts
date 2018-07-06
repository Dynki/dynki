export interface DynMenu {
    title: string;
    items: Array<DynMenuItem>;
}

export interface DynMenuItem {
    title: string;
    icon?: string;
    button?: DynMenuButton;
    expanded?: boolean;
    submenu?: Array<DynMenuItem>
}

export interface DynMenuButton {
    caption: string;
    title: string;
    type?: string;
    clickAction?: string;
}

