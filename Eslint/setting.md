# ESlint保存自动格式化代码

* 需要vscode先安装ESlint插件, 同时也适用于TSlint

```json
   // .vscode/settings.json
    {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
    }
```