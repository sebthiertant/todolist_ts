var task_input = document.querySelector('.task_input');
var container = document.querySelector('.bloc_container');
var items_left = document.querySelector('.items_left');
var clear_button = document.querySelector('.task_clear');
var all_filter = document.querySelector('.all_button');
var active_filter = document.querySelector('.active_button');
var completed_filter = document.querySelector('.completed_button');
// ajout du formulaire 
var formulaire = document.getElementById("send-form");
//research form
var research = document.getElementById("search-form");
var task_count = 0;
var task_content_array = [];
function add_task() {
    var task_wrapper = document.createElement('div');
    task_wrapper.classList.add('task_wrapper');
    container.appendChild(task_wrapper);
    var task = document.createElement('div');
    task.classList.add('created_task');
    task_wrapper.appendChild(task);
    // research value
    task.textContent = task_input.value;
    task_content_array.push(task_input.value.toLowerCase().split(""));
    // fonction completed task
    task_wrapper.addEventListener('click', completed_task);
    task_count += 1;
    count_items(task_count);
    var remove_button = document.createElement('button');
    remove_button.classList.add('remove_button');
    task_wrapper.appendChild(remove_button);
    remove_button.textContent = "X";
    remove_button.addEventListener('click', remove_task);
    // reset de l'input
    task_input.value = "";
}
// fonction et évènement de click sur le clear button avec actualisation du comptage des tasks
function clear_all() {
    var all_task = document.querySelectorAll('div.task_wrapper');
    for (var _i = 0, all_task_1 = all_task; _i < all_task_1.length; _i++) {
        var element = all_task_1[_i];
        element.remove();
    }
    task_count = 0;
    count_items(task_count);
}
clear_button.addEventListener('click', clear_all);
//fonction qui supprimer la note concernée
function remove_task() {
    container.removeChild(this.parentNode);
    task_count -= 1;
    count_items(task_count);
}
// ajouter ou supprimer le s du mot item(s)
function count_items(number) {
    if (number <= 1) {
        items_left.textContent = number + " item left";
    }
    else {
        items_left.textContent = number + " items left";
    }
}
// fonction de completed d'une task
function completed_task() {
    this.classList.toggle('completed');
    this.childNodes[0].classList.toggle('completed_text');
}
// fonctions de filtrations 
function completed_filter_function() {
    task_count = 0;
    for (var index = 3; index < container.childNodes.length; index++) {
        if (!container.childNodes[index].classList.contains('completed')) {
            container.childNodes[index].style = "display:none";
        }
        else {
            container.childNodes[index].style = "display:flex";
            task_count += 1;
        }
        count_items(task_count);
    }
}
function active_filter_function() {
    task_count = 0;
    for (var index = 3; index < container.childNodes.length; index++) {
        if (container.childNodes[index].classList.contains('completed')) {
            container.childNodes[index].style = "display:none";
        }
        else {
            container.childNodes[index].style = "display:flex";
            task_count += 1;
        }
        count_items(task_count);
    }
}
function all_filter_function() {
    task_count = 0;
    for (var index = 3; index < container.childNodes.length; index++) {
        container.childNodes[index].style = "display:flex";
        task_count += 1;
    }
    count_items(task_count);
}
// fonction de recherche
var task_score = 0;
var search_array = [];
function research_function() {
    var all_created_task = document.querySelectorAll('div.created_task');
    // [0].innerText
    var search_input = document.querySelector('.search_input');
    var search_input_value = search_input.value.split("");
    var task_score = 0;
    for (var task_number = 0; task_number < task_content_array.length; task_number++) {
        for (var research_length = 0; research_length < search_input_value.length; research_length++) {
            if (task_content_array[task_number].indexOf(search_input_value[research_length]) != -1) {
                task_score += 1;
            }
        }
        // push the match score at the end of the array
        task_content_array[task_number].push(task_score);
        //reset the task score
        task_score = 0;
    }
    var sorted_task = task_content_array.map(function (a) { return a.reverse(); }).sort(function (a, b) { return b[0] - a[0]; }).map(function (a) { return a.reverse(); });
    // remove the score from the arrays
    sorted_task.map(function (a) { return a.pop(); });
    // display the array content into the task 
    for (var m = 0; m < all_created_task.length; m++) {
        all_created_task[m].innerText = sorted_task[m].join("");
    }
    search_input.value = "";
}
// évènements de filtres
completed_filter.addEventListener("click", completed_filter_function);
active_filter.addEventListener("click", active_filter_function);
all_filter.addEventListener("click", all_filter_function);
//gestion de la touche entrée et du click pour la recherche
research.addEventListener("submit", function (e) {
    e.preventDefault();
    research_function();
});
//gestion de la touche entrée et du click pour l'ajout d'élément 
formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    add_task();
});
