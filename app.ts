const task_input = <HTMLInputElement>document.querySelector('.task_input');
const container = <HTMLInputElement>document.querySelector('.bloc_container');
const items_left = <HTMLInputElement>document.querySelector('.items_left');
const clear_button = <HTMLInputElement>document.querySelector('.task_clear');
const all_filter = <HTMLInputElement>document.querySelector('.all_button');
const active_filter = <HTMLInputElement>document.querySelector('.active_button');
const completed_filter = <HTMLInputElement>document.querySelector('.completed_button');
// ajout du form 
const form = <HTMLInputElement>document.getElementById("send-form");
//research form
const research = <HTMLInputElement>document.getElementById("search-form");


// main function that add task to the DOM 
let task_count = 0;
let task_content_array = [];

function add_task() {
    const task_wrapper = document.createElement('div');
    task_wrapper.classList.add('task_wrapper');
    container.appendChild(task_wrapper);
    const task = document.createElement('div');
    task.classList.add('created_task');
    task_wrapper.appendChild(task);

    // research value
    task.textContent = task_input.value;
    task_content_array.push(task_input.value.toLowerCase().split(""));

    //  completed task function
    task_wrapper.addEventListener('click', completed_task);
    task_count += 1;
    count_items(task_count);
    const remove_button = document.createElement('button');
    remove_button.classList.add('remove_button');
    task_wrapper.appendChild(remove_button);
    remove_button.textContent = "X";
    remove_button.addEventListener('click', remove_task);
    // reset de l'input
    task_input.value = "";
}

// clear function with count reset
function clear_all() {
    const all_task = document.querySelectorAll('div.task_wrapper')
    for (const element of all_task) {
        element.remove();
    }
    task_count = 0;
    count_items(task_count);
}

//remove all taks function
function remove_task() {
    container.removeChild(this.parentNode);
    task_count -= 1;
    count_items(task_count);
}
// count function and add "s" letter if more than one task
function count_items(number: number) {
    if (number <= 1) {
        items_left.textContent = `${number} item left`;
    } else {
        items_left.textContent = `${number} items left`;
    }
}

// completed task function
function completed_task() {
    this.classList.toggle('completed');
    this.childNodes[0].classList.toggle('completed_text');
}

//  filters functions 
function completed_filter_function() {
    task_count = 0;
    for (let index = 3; index < container.childNodes.length; index++) {
        if (!container.childNodes[index].classList.contains('completed')) {
            container.childNodes[index].style = "display:none";
        } else {
            container.childNodes[index].style = "display:flex";
            task_count += 1;
        }
        count_items(task_count);
    }
}

function active_filter_function() {
    task_count = 0;
    for (let index = 3; index < container.childNodes.length; index++) {
        if (container.childNodes[index].classList.contains('completed')) {
            container.childNodes[index].style = "display:none";
        } else {
            container.childNodes[index].style = "display:flex";
            task_count += 1;
        }
        count_items(task_count);
    }
}

function all_filter_function() {
    task_count = 0;
    for (let index = 3; index < container.childNodes.length; index++) {
        container.childNodes[index].style = "display:flex";
        task_count += 1;
    }
    count_items(task_count);
}


// research function
let task_score: number = 0;
let search_array = [];

function research_function() {
    const all_created_task = document.querySelectorAll('div.created_task')
    let search_input = <HTMLInputElement>document.querySelector('.search_input');
    const search_input_value = search_input.value.split("");
    let task_score = 0;

    for (let task_number = 0; task_number < task_content_array.length; task_number++) {

        for (let research_length = 0; research_length < search_input_value.length; research_length++) {

            if (task_content_array[task_number].indexOf(search_input_value[research_length]) != -1) {
                task_score += 1;
            }
        }
        // push the match score at the end of the array
        task_content_array[task_number].push(task_score)
        //reset the task score
        task_score = 0;
    }
    let sorted_task = task_content_array.map((a) => a.reverse()).sort((a, b) => b[0] - a[0]).map((a) => a.reverse())
    // remove the score from the arrays
    sorted_task.map((a) => a.pop());
    // display the array content into the task 
    for (let m = 0; m < all_created_task.length; m++) {
        all_created_task[m].innerText = sorted_task[m].join("")
    }
    search_input.value = "";
}


//clear event
clear_button.addEventListener('click', clear_all);

// filter events
completed_filter.addEventListener("click", completed_filter_function);
active_filter.addEventListener("click", active_filter_function);
all_filter.addEventListener("click", all_filter_function);


//research submit event
research.addEventListener("submit", function (e) {
    e.preventDefault();
    research_function();
});


// input form submit event
form.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    add_task();
});
