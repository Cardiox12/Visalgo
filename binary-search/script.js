const add_input = document.getElementById("add-input");
const add_button = document.getElementById("add-button");
const find_input = document.getElementById("find-input");
const find_button = document.getElementById("find-button");

function timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Row {
    constructor(id, visible) {
        this.row = document.getElementById(id);
        this.visible = visible;
    }

    clear(){
        while ( this.row.firstChild ){
            this.row.removeChild(this.row.firstChild);
        }
    }

    add(num){
        const div = document.createElement("div");

        div.classList.add("cell");
        if ( this.visible ){
            div.classList.add("cell-visible");
            div.textContent = num;
        }
        this.row.appendChild(div);
    }

    clearContent(){
        for ( let index = 0 ; index < this.row.children.length ; index++ ){
            if ( this.visible ){
                this.row.children[index].style.backgroundColor = "white";
                this.row.children[index].style.color = "black";
            } else {
                this.row.children[index].textContent = "";
            }
        }
    }

    setCursor(index, cursor){
        if ( index >= 0 && index < this.row.children.length ){
            this.clearContent();
            const cell = this.row.children[index];

            cell.textContent = cursor;
        }
    }

    setColor(index, color){
        if ( index >= 0 && index < this.row.children.length ){
            const cell = this.row.children[index];

            this.clearContent();
            cell.style.backgroundColor = color;
            cell.style.color = "white";
        }
    }
}

class BinarySearch {
    constructor() {
        this.top_row = new Row("top", false);
        this.mid_row = new Row("mid", true);
        this.bot_row = new Row("bot", false);

        this.add_input = document.getElementById("add-input");
        this.add_button = document.getElementById("add-button");
        this.values = [];
    }

    add(num){
        this.top_row.add();
        this.mid_row.add(num);
        this.bot_row.add();
    }

    clear(){
        this.top_row.clear();
        this.mid_row.clear();
        this.bot_row.clear();
    }

    addValues(){
        let values = add_input.value.trim().split(' ').map((item) => {
            return parseInt(item, 10);
        });

        values.sort((a, b) => a - b);
        this.clear();
        values.forEach((value) => {
            this.add(value);
        });
        this.values = values;
    }

    setLowCursor(index){
        this.bot_row.setCursor(index, "⬆️");
    }

    setHighCursor(index){
        this.top_row.setCursor(index, "⬇️");
    }

    async find(val){
        let mid;
        let low = 0;
        let high = this.values.length - 1;

        console.log(val);
        while ( low <= high ){
            mid = Math.round((high + low) / 2);

            this.setHighCursor(high);
            this.setLowCursor(low);
            this.mid_row.setColor(mid, "#DAD992");
            if ( this.values[mid] === val ){
                return mid;
            }
            if ( val < this.values[mid] ){
                high = mid - 1;
            } else {
                low = mid + 1;
            }
            await timeout(1000);
        }
        return val;
    }
}

const anim = new BinarySearch();

add_button.addEventListener("click", (event) => {
    anim.addValues();
})

add_input.addEventListener("keyup", (event) => {
    if ( event.key === "Enter" ){
        anim.addValues();
    }
})

find_button.addEventListener("click", async (event) => {
    const val = parseInt(find_input.value);

    await anim.find(val);
});

find_input.addEventListener("keyup", async (event) => {
    if ( event.key === "Enter" ){
        const val = parseInt(find_input.value);
        console.log("bite");

        await anim.find(val);
    }
});


