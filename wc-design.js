window.addEventListener("DOMContentLoaded", () => {

    const allModalAddBackground = document.querySelectorAll(".wc-modal");
    allModalAddBackground.forEach(e => {
        e.innerHTML += `<div class="wc-modal-background-fixed"></div>`;
    });

    const allBtnModal = document.querySelectorAll("[data-wc-toggle='modal']");
    allBtnModal.forEach(e => {
        const modal = document.querySelector(e.dataset.wcTarget);
        e.addEventListener("click", () => {
            modal.classList.add("wc-show-modal");
            document.querySelector("body").style.overflow = "hidden";
        });
        if(modal.querySelector(".wc-close-button")){
            modal.querySelector(".wc-close-button").addEventListener("click", () => {
                modal.classList.remove("wc-show-modal");
                document.querySelector("body").style.overflow = "auto";
            });
        }
        
        if(modal.querySelector(".wc-close-modal")){
            modal.querySelector(".wc-close-modal").addEventListener("click", () => {
                modal.classList.remove("wc-show-modal");
                document.querySelector("body").style.overflow = "auto";
            });
        }
        if (modal.querySelector(".wc-modal-background-fixed")){
            modal.querySelector(".wc-modal-background-fixed").addEventListener("click", () => {
                modal.classList.remove("wc-show-modal");
                document.querySelector("body").style.overflow = "auto";
            });
        }
    });
    const wc_custom_selec = document.querySelectorAll(".wc-custom-select");
    wc_custom_selec.forEach(e => {
        const select = e;
        const selectParent = e.parentElement;
        selectParent.innerHTML += `
        <div class="wc-custom-select-options">
            <a href="#" class="wc-select-action"></a>
            <div class="wc-select-options-content">
                <ul class="wc-list-select-options-items"></ul>
            </div>
        </div>`;
        selectParent.querySelector(".wc-select-action").addEventListener("click", function(cl) {
            const selec_action = this;
            cl.preventDefault();
            selec_action.parentElement.querySelector(".wc-select-options-content").classList.toggle("show");
            selectParent.querySelector(".wc-custom-select-options").classList.toggle("open");

            const list = selectParent.querySelector(".wc-custom-select-options .wc-select-options-content .wc-list-select-options-items");
            list.innerHTML = "";

            Array.from(select.options).forEach((op, opk) => {
                list.innerHTML += `
                    <li class="wc-list-select-option-item" data-active-option="${opk}">
                        <a href="#" class="wc-option-item-link">${op.text}</a>
                    </li>
                `;
            });

            const select_options = list.querySelectorAll(".wc-list-select-option-item");
            select_options.forEach((element, key) =>{
                element.addEventListener("click", function(el) {
                    el.preventDefault();
                    selec_action.parentElement.querySelector(".wc-select-options-content.show").classList.remove("show");
                    selectParent.querySelector(".wc-custom-select-options.open").classList.remove("open");
                    selectParent.querySelector(".wc-custom-select").options[this.dataset.activeOption].selected = true;
                });
            });
        });
    });
    document.addEventListener("click", function(elem){
        if(!elem.target.classList.contains("wc-select-action")){
            if(document.querySelector(".wc-custom-select-options.open")){
                if(elem.target !== document.querySelector(".wc-custom-select-options.open")){
                    document.querySelector(".wc-select-options-content.show").classList.remove("show");
                    document.querySelector(".wc-custom-select-options.open").classList.remove("open");
                }
            }
        }else{
            if(document.querySelectorAll(".wc-custom-select-options.open").length > 1){
                document.querySelectorAll(".wc-custom-select-options.open").forEach(e => {
                    if(e === elem.target.parentElement){
                        e.querySelector(".wc-select-options-content").classList.add("show");
                        e.classList.add("open");
                    }else{
                        e.querySelector(".wc-select-options-content").classList.remove("show");
                        e.classList.remove("open");
                    }
                });
            }
        }
    });
});


/**
 * settings is the autocomplete configuration field
 * keyAndValue is boolean allowing only true/false, default is false */
function wc_autocomplete(settings, object){
    settings.keyAndValue = typeof settings.keyAndValue !== 'undefined' ? settings.keyAndValue : false;
    settings.elementQuery = typeof settings.elementQuery !== 'undefined' ? settings.elementQuery : null;
    settings.callback = typeof settings.elementQuery !== 'undefined' ? settings.callback : function(){};

    const elementQuery = settings.elementQuery;

    const viewAutocomplete = document.createElement("div");
    viewAutocomplete.classList.add("wc-autocomplete-content");

    viewAutocomplete.innerHTML = `
        <ul class="wc-autocomplete-list"></ul>
    `;

    const getElementList = viewAutocomplete.querySelector(".wc-autocomplete-list");

    elementQuery.parentNode.insertBefore(viewAutocomplete, elementQuery.nextSibling);
    elementQuery.addEventListener("input", function(){
        const query = this.value;
        let contentList = "";
        if(query.length > 2 && wc_load_autocomplete(settings, object, query).length > 0){
            viewAutocomplete.classList.add("show");
            getElementList.innerHTML = "";
            wc_load_autocomplete(settings, object, query).forEach(lists => {
                if(settings.keyAndValue === true){
                    let newLi = document.createElement("li");
                    let newA = document.createElement("a");
                    let aText = document.createTextNode(lists.title);

                    newLi.insertBefore(newA, newLi.firstChild);
                    newLi.dataset.id = lists.id;
                    newA.insertBefore(aText, newA.firstChild);
                    newA.href = "#";
                    newA.addEventListener("click", function(e){
                        e.preventDefault();
                        elementQuery.value = lists.title;
                        elementQuery.dataset.id = lists.id;
                        viewAutocomplete.classList.remove("show");
                        settings.callback(lists.id, lists.title);
                    });
                        
                    getElementList.insertBefore(newLi, getElementList.firstChild);
                }else{
                    contentList += `<li><a href="#">${lists.title}</a></li>`;
                }
            });
        }else{
            viewAutocomplete.classList.remove("show");
        }
    });
}

function wc_load_autocomplete(settings, array, query){
    if(settings.keyAndValue === true){
        return array.filter(e => {
            return e.title.toLowerCase().indexOf(query.toLowerCase())  > -1;
        });
    }else{
        return array.filter(e => {
            return e.toLowerCase().indexOf(query.toLowerCase())  > -1;
        });
    }
}


const wc = function(element) {
    return {
        autocomplete: function(settings, object){
            settings.keyAndValue = typeof settings.keyAndValue !== 'undefined' ? settings.keyAndValue : false;
            settings.elementQuery = typeof settings.elementQuery !== 'undefined' ? settings.elementQuery : null;
            settings.callback = typeof settings.elementQuery !== 'undefined' ? settings.callback : function(){};

            const elementQuery = settings.elementQuery;

            const viewAutocomplete = document.createElement("div");
            viewAutocomplete.classList.add("wc-autocomplete-content");

            viewAutocomplete.innerHTML = `
                <ul class="wc-autocomplete-list"></ul>
            `;

            const getElementList = viewAutocomplete.querySelector(".wc-autocomplete-list");

            elementQuery.parentNode.insertBefore(viewAutocomplete, elementQuery.nextSibling);
            elementQuery.addEventListener("input", function(){
                const query = this.value;
                let contentList = "";
                if(query.length > 2 && wc_load_autocomplete(settings, object, query).length > 0){
                    viewAutocomplete.classList.add("show");
                    getElementList.innerHTML = "";
                    wc_load_autocomplete(settings, object, query).forEach(lists => {
                        if(settings.keyAndValue === true){
                            let newLi = document.createElement("li");
                            let newA = document.createElement("a");
                            let aText = document.createTextNode(lists.title);

                            newLi.insertBefore(newA, newLi.firstChild);
                            newLi.dataset.id = lists.id;
                            newA.insertBefore(aText, newA.firstChild);
                            newA.href = "#";
                            newA.addEventListener("click", function(e){
                                e.preventDefault();
                                elementQuery.value = lists.title;
                                elementQuery.dataset.id = lists.id;
                                viewAutocomplete.classList.remove("show");
                                settings.callback(lists.id, lists.title);
                            });
                                
                            getElementList.insertBefore(newLi, getElementList.firstChild);
                        }else{
                            contentList += `<li><a href="#">${lists.title}</a></li>`;
                        }
                    });
                }else{
                    viewAutocomplete.classList.remove("show");
                }
            });
        },

        notify: function(options = null){
            if(!options.eventType){
                options.eventType = "snapshot";
            }
            if(!options.okText){
                options.okText = "OK";
            }

            const locallAllNotify = document.createElement("div");
            locallAllNotify.classList.add("wc-all-notify");
            const notifyElement = document.createElement("div");
            notifyElement.classList.add("wc-notify");
            if(options.icon){
                notifyElement.innerHTML += `
                    <div class="wc-notify-icon wc-notify-icon-${options.notifyType ? options.notifyType : "info"}">
                        <div class="wc-notify-icon-item">
                            ${options.icon}
                        </div>
                    </div>
                `;
            }
            notifyElement.innerHTML += `
                <div class="wc-notify-constent">
                    <div class="wc-notify-header">
                        <div class="wc-notify-title">${options.title}</div>
                        <button type="button" class="wc-close-button wc-notify-colse"><span>&times;</span></button>
                    </div>
                    <div class="wc-notify-body">
                        <div class="wc-notify-message">${options.message}</div>
                    </div>
                    <div class="wc-notify-footer">
                        <div class="wc-notify-actions">
                            ${options.cancelText ? `<button type="button" class="wc-btn wc-btn-danger wc-notify-cancel-btn">${options.cancelText}</button>` : ""}
                            <button type="button" class="wc-btn wc-btn-primary wc-notify-ok-btn">${options.okText}</button>
                        </div>
                    </div>
                </div>
            `;

            if(notifyElement.querySelector(".wc-notify-cancel-btn")){
                const allNotifyCancelBtn = notifyElement.querySelector(".wc-notify-cancel-btn");

                allNotifyCancelBtn.addEventListener("click", function() {
                    const notify = this.parentElement.parentElement.parentElement.parentElement;
                    notify.parentElement.removeChild(notify);
                    options.cancelAction();
                });
            }

            if(notifyElement.querySelector(".wc-notify-ok-btn")){
            
                const allNotifyOkBtn = notifyElement.querySelector(".wc-notify-ok-btn");

                allNotifyOkBtn.addEventListener("click", function() {
                    const notify = this.parentElement.parentElement.parentElement.parentElement;
                    notify.parentElement.removeChild(notify);
                    options.okAction();
                });
            }

            const btnCloseNotify = notifyElement.querySelector(".wc-notify-colse");

            btnCloseNotify.addEventListener("click", function() {
                const notify = this.parentElement.parentElement.parentElement;
                notify.parentElement.removeChild(notify);
            });

            if(!document.querySelector(".wc-all-notify")){
                document.querySelector("body").insertAdjacentElement("beforeend", locallAllNotify);
            }

            if(options.eventType != "snapshot"){
                document.querySelector(element).addEventListener(options.eventType, function(){
                    document.querySelector(".wc-all-notify").appendChild(notifyElement);
                    notifyElement.classList.add("wc-notify-show");
                });
            }else{
                document.querySelector(".wc-all-notify").appendChild(notifyElement);
                notifyElement.classList.add("wc-notify-show");
            }
        }
    }
}