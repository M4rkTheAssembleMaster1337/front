"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const [secondName, firstName, thirdName] = fio.split(" ");
    return firstName+' '+secondName;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array))
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
    if (array.length === 0) return 0;
    return array.reduce((x, y) => Math.max(x, y)) / array.reduce((x, y) => Math.min(x, y));
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor () {
        this.map = new Map();
    }

    set (key, value) {
        if (typeof(key) !== 'string' || typeof(value) !== 'string') return null;
        this.map.set(key, value);
    }

    get (key) {
        return this.map.get(key);
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};