window.addEventListener("DOMContentLoaded", () => {
    const $allBtnModal = document.querySelectorAll("[data-wc-toggle='modal']");
    $allBtnModal.forEach(e => {
        const $modal = document.querySelector(e.dataset.wcTarget);
        e.addEventListener("click", () => {
            $modal.classList.add("wc-show-modal");
            document.querySelector("body").style.overflow = "hidden";
        });
        $modal.querySelector(".wc-close-button").addEventListener("click", () => {
            $modal.classList.remove("wc-show-modal");
            document.querySelector("body").style.overflow = "auto";
        });
        $modal.querySelector(".wc-close-modal").addEventListener("click", () => {
            $modal.classList.remove("wc-show-modal");
            document.querySelector("body").style.overflow = "auto";
        });
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
        // console.log(elem.target);
        // console.log(document.querySelector(".wc-custom-select-options.open"));
        if(document.querySelector(".wc-custom-select-options.open")){
            console.log("Aberto");
            // document.querySelectorAll(".wc-select-action").forEach(e => {
            //     if(elem.target !== e){
            //         document.querySelector(".wc-select-options-content.show").classList.remove("show");
            //         document.querySelector(".wc-custom-select-options.open").classList.remove("open");
            //     }else{
            //         console.log("AAAAA")
            //     }
            // });
        }else{
            console.log("Fechado")
        }
    });
});