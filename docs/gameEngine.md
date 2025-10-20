### GameEngine
Основной класс где запускается игровой цикл

Аргументы конструктора `TGameEngine`:
**containerId** - id html-тега, где будет размещена игра
**onResourceUpdate** - коллбэк получения/траты ресурсов
**onGameOver** - коллбэк завешения игры

Пример инициализации и запуска игрового движка
```js
new GameEngine({
  containerId: "game",
  onResourceUpdate,
  onGameOver,
})
```

### AbstractGamePage
* Абстрактый класс стрицы/экрана игры

### PageManager
* Класс отвечаюий за работу со страницами, созданных на основе AbstractGamePage

### SideMenu
* Класс отвечающий за работу с боковым меню

### ActivityManager
* Класс отвечает за расчёт прогресса игрока и фоновое выполнение активностей
