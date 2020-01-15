# vanilla-class-handler

    Attributes:
        -> target: required
        -> classes: required
        -> toggle-all: not required, defaults to true - acceptable values: true || false
        -> function: not required, defaults to toggle - acceptable values: "toggle" || "add" || "remove"
    
   # Example:
    
    ```
    <button onclick="classHandler(event,[
        {            
            'target': '.header__nav-item',
            'classes': 'is-active',
            'function': 'remove'        
        },        
        {            
            'target': '.header',
            'classes': 'is-active'
        }    
    ])">Click me</button>
    ```
