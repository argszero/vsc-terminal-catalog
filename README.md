# vsc-terminal-catalog README

terminal 目录管理

## Features


## Requirements


## Extension Settings

add follow lines to settings.json
```
 "vsc-terminal-catalog.catalog-file": "/Users/argszero/.vscode/vsc-terminal-catalog/terminals.json"
```

terminals.json
```
[
    {
        "name": "公司",
        "children": [
            {
                "name": "生产",
                "children": [
                    {
                        "name": "server0",
                        "commmand": "ssh root@172.16.200.10",
                        "collapsible": 0
                    },
                    {
                        "name": "server1",
                        "commmand": "ssh shaoaq@root@172.16.200.20@jumperserver.xx.com -p2222",
                        "collapsible": 0
                    }
                ],
                "collapsible": 1
            }
        ],
        "collapsible": 2
    },
    {
        "name": "其他",
        "children": [],
        "collapsible": 1
    }
]
```

## Known Issues


## Release Notes


### 1.0.0



---

## Following extension guidelines


## Working with Markdown

## For more information

**Enjoy!**
