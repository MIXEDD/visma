interface TreeNode {
    fullName: string;
    email: string;
}

export interface TreeData extends TreeNode {
    subNodes?: Array<TreeNode>;
}
