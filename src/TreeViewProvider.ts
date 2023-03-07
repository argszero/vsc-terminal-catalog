import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window, workspace } from 'vscode';
import { join } from 'path';
import { readFileSync } from 'fs';

const terminals = JSON.parse(readFileSync(workspace.getConfiguration("vsc-terminal-catalog").get("catalog-file", "terminals.json"), 'utf-8'));

// 第一步：创建单项的节点(item)的类
export class TreeItemNode extends TreeItem {
    terminalCommand: string;
    children: TreeItemNode[];
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
        iconName: string,
        terminalCommand: string,
        children: TreeItemNode[]
    ) {
        super(label, collapsibleState);
        this.children = children;
        this.iconPath = Uri.file(join(__filename, '..', '..', 'resources', iconName))
        this.terminalCommand = terminalCommand;
        this.command = {
            title: this.label,
            command: 'itemClick',
            tooltip: this.label,
            arguments: [
                this.label,
                this.terminalCommand,
                this.collapsibleState
            ]
        }
    }
}

interface TerminalConfigNode {
    name: string,
    children: TerminalConfigNode[] | null,
    collapsible: TreeItemCollapsibleState,
    commmand: string
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    // 自动弹出的可以暂不理会
    onDidChangeTreeData?: import("vscode").Event<TreeItemNode | null | undefined> | undefined;

    // 自动弹出
    // 获取树视图中的每一项 item,所以要返回 element
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    configNode2TreeNode(configNode: TerminalConfigNode): TreeItemNode {
        let children = (configNode.children || []).map(child => this.configNode2TreeNode(child));
        let treeNode = new TreeItemNode(configNode.name, configNode.collapsible, configNode.collapsible == 0 ? "console.svg" : "folder.svg", configNode.commmand, children);
        return treeNode;
    }

    getChildren(element?: TreeItemNode | undefined): import("vscode").ProviderResult<TreeItemNode[]> {
        if (!element) {
            return terminals.map((node: TerminalConfigNode) => this.configNode2TreeNode(node))
        } else {
            return element.children;
        }
    }
}