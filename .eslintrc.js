module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": [
        "airbnb",
        "plugin:react-app/recommended",
        "plugin:prettier/recommended",
        "prettier/react",
        "prettier/standard"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "arrowFunctions": true,
            "blockBindings": true,
            "destructuring": true,
            "modules": true,
            "spread": true,
            "templateStrings": true,
            "forOf": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"      
    ],
    "rules": {
        "linebreak-style": 0,
        "class-methods-use-this": 0,
        "import/no-named-as-default": 0,
        "react/jsx-filename-extension": [
            "error",
            {
              "extensions": [".js", ".jsx"]
            }
        ],
        "react-app/jsx-a11y/href-no-hash": "off"
    }
};