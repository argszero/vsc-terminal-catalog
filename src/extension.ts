// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TreeViewProvider } from './TreeViewProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const treeViewProvider = new TreeViewProvider();
	vscode.window.registerTreeDataProvider('vsc-terminal-catalog-treeView', treeViewProvider);

	context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label, command, collapsible) => {
		if (collapsible === 0) {
			const terminal = vscode.window.createTerminal({ location: vscode.TerminalLocation.Editor, name: label });
			terminal.sendText(command);
		}
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
