/* 
###################################
##           CONTENTS           ##
##################################
- Toggle class
    -- Example
    -- Handles adding and removal of classes
    -- Toggle controller
    -- Initiates the toggle triggers

- Export
*/

/*###################################
#
#     TOGGLE CLASS
#
##################################### */

/*
* Example
*/

/*
    data-class-trigger is added to the trigger element as JSON - Single quotes 
    Attributes:
        -> target: required
        -> classes: required
        -> toggle-all: not required, defaults to true - acceptable values: true || false
        -> function: not required, defaults to toggle - acceptable values: "toggle" || "add" || "remove"
    
    Example: 
    data-class-trigger="[
        {
            'target': '.global-header__nav-item',
            'classes': 'global-header__nav-item--mobile-sub-nav-active',
            'toggle-all': false
            'function': 'remove'
        },
        {
            'target': '.global-header__container',
            'classes': 'global-header__container--mobile-nav-active'
        }
    ]"
*/

const ToggleClass = {

    /*
    * Handles adding and removal or classes
    */
    handleClasses(data) {
        let targets = document.querySelectorAll(data.target), //Because you may want to add/ remove classes on multiple instances
            classes = data.classes.split(','), //Split the classes so you can add and remove each
            classFunction = data.function ? data.function : 'toggle', //Fallback set to toggle if no function is set
            toggleAll = data.toggleAll ? data.toggleAll : true; //Fallback set to true if toggle-all not set

        for (let i = 0; i < targets.length; i++) {
            if (classFunction === 'toggle') {
                classes.forEach((singleClass) => { //Toggles each class if function is toggle or not set
                    targets[i].classList.toggle(singleClass.trim());
                });
            }
            else if (classFunction === 'add') {
                classes.forEach((singleClass) => { //Adds each class if function is set to add
                    targets[i].classList.add(singleClass.trim());
                });
            }
            else if (classFunction === 'remove') {
                classes.forEach((singleClass) => { //Adds each class if function is set to remove
                    targets[i].classList.remove(singleClass.trim());
                });
            }
            else {
                //If an unknown function is set throw an error
                console.error('If "function" is present it must be set to "toggle", "add" or "remove"')
            }

            if (!toggleAll) { break; } // If toggle-all is set to false, break loop after first instance
        }

    },

    /*
    * Toggle controller 
    */
    toggleClasses(e) {
        e.preventDefault();
        let clicked = e.currentTarget,
            data = clicked.getAttribute('data-class-trigger').replace(/\s/g, '').replace(/'/g, '"'); //Format for JSON
            dataItems = JSON.parse(data); //Parse JSON data so we can work with it


        dataItems.forEach((item) => {
            if (item.target && item.classes) { // Check the required JSON attributes are set
                this.handleClasses(item);
            }
            else { //Fail if required JSON attributes do not exist
                console.error('"target" and "classes" are required'); 
            }
        })
    },

    /*
    * Initiates the toggle triggers
    */
    init() {
        let self = this;
            toggles = document.querySelectorAll('[data-class-trigger]');
        
        //Add a click event too all triggers
        toggles.forEach((toggle) => {
            toggle.addEventListener('click', self.toggleClasses.bind(self));
        });
    }
};

/*###################################
#
#     EXPORT
#
##################################### */

export {
    ToggleClass
}
