'use strict';

const savedClasses = JSON.parse(localStorage.getItem('classes')) || JSON.parse(classes);
const containerEl = document.querySelector('.container');
const template = item__template.content;
savedClasses.forEach((el) => {
    const newTemplate = template.cloneNode(true);
    newTemplate.querySelector('img').src = el.img;
    newTemplate.querySelector('img').alt = el.title;
    newTemplate.querySelector('h5').textContent = el.title;
    newTemplate.querySelector('.time').textContent = el.time;
    newTemplate.querySelector('.max-members b').textContent = el.maxMembers;
    newTemplate.querySelector('.current-members b').textContent = el.currentMembers;
    containerEl.appendChild(newTemplate);
});

const saveData = () => {
    localStorage.setItem('classes', JSON.stringify(savedClasses));
}

const btnSuccessEls = document.querySelectorAll('.btn-success');
btnSuccessEls.forEach((button) => {
    const parentEl = button.parentElement;
    const maxMembers = parentEl.querySelector('.max-members b');
    const currentMembers = parentEl.querySelector('.current-members b');
    if (Number(currentMembers.textContent) == Number(maxMembers.textContent)) {
        button.textContent = 'Нет мест';
        button.disabled = true;
    }
});

document.querySelectorAll('.btn-success').forEach((button, index) => button.addEventListener('click', (e) => {
    const parentEl = button.parentElement;
    const maxMembers = parentEl.querySelector('.max-members b');
    const currentMembers = parentEl.querySelector('.current-members b');
    if (Number(currentMembers.textContent) < Number(maxMembers.textContent)) {
        currentMembers.textContent = Number(currentMembers.textContent) + 1;
        savedClasses[index].currentMembers++;
        button.textContent = 'Вы записаны';
        button.disabled = true;
        parentEl.querySelector('.btn-danger').style.display = 'block';
        parentEl.querySelector('.btn-danger').disabled = false;
        parentEl.querySelector('.btn-danger').textContent = 'Отмена записи';
        saveData();
    }
}));

document.querySelectorAll('.btn-danger').forEach((button, index) => button.addEventListener('click', (e) => {
    const parentEl = button.parentElement;
    const currentMembers = parentEl.querySelector('.current-members b');
    currentMembers.textContent = Number(currentMembers.textContent) - 1;
    button.textContent = 'Отмена записи';
    button.disabled = true;
    parentEl.querySelector('.btn-success').disabled = false;
    parentEl.querySelector('.btn-success').textContent = 'Записаться';
    savedClasses[index].currentMembers--;
    saveData();
}));