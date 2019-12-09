window.addEventListener("DOMContentLoaded", () => {

    const $allModalAddBackground = document.querySelectorAll(".wc-modal");
    $allModalAddBackground.forEach(e => {
        e.innerHTML += `<div class="wc-modal-background-fixed"></div>`;
    });

    const $allBtnModal = document.querySelectorAll("[data-wc-toggle='modal']");
    $allBtnModal.forEach(e => {
        const $modal = document.querySelector(e.dataset.wcTarget);
        e.addEventListener("click", () => {
            $modal.classList.add("wc-show-modal");
            document.querySelector("body").style.overflow = "hidden";
        });
        if($modal.querySelector(".wc-close-button")){
            $modal.querySelector(".wc-close-button").addEventListener("click", () => {
                $modal.classList.remove("wc-show-modal");
                document.querySelector("body").style.overflow = "auto";
            });
        }
        
        if($modal.querySelector(".wc-close-modal")){
            $modal.querySelector(".wc-close-modal").addEventListener("click", () => {
                $modal.classList.remove("wc-show-modal");
                document.querySelector("body").style.overflow = "auto";
            });
        }
        if ($modal.querySelector(".wc-modal-background-fixed")){
            $modal.querySelector(".wc-modal-background-fixed").addEventListener("click", () => {
                $modal.classList.remove("wc-show-modal");
                document.querySelector("body").style.overflow = "auto";
            });
        }
    });
    const $wc_custom_selec = document.querySelectorAll(".wc-custom-select");
    $wc_custom_selec.forEach(e => {
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

    document.querySelectorAll("[data-wc-input='autocomplete']").forEach(element => {
        element.addEventListener("input", function(){
            const input = this;
            const target = this.dataset.target;

        });
    });
});