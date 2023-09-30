const ru = {
  common: {
    ok: "ОК!",
    cancel: "Отмена",
    back: "Назад",
  },
  welcomeScreen: {
    postscript:
      "Данное приложение является не оффициальным клиентом для программного обеспечения Gizmo. Оно было создано командой debitsoft.",
    readyForLaunch: "Gizmo клиент готов к запуску!",
    exciting: "(Ничего платить не нужно, это бесплатно!)",
    button: "Давайте начнем!",
  },
  connectionsScreen: {
    title: "Мои подключения",
    listEmptyText: "У вас пока нет ни одного подключения",
    btnAddConnection: "Добавить подключение",
  },
  addConnectionScreen: {
    title: "Добавить подключение",
    namePlaceholder: "Имя подключения",
    addressPlaceholder: "IP адрес или доменное имя подключения",
    portPlaceholder: "Порт подключения",
    usernamePlaceholder: "Имя пользователя",
    passwordPlaceholder: "Пароль",
    btnSave: "Добавить подключение",
  },
  errorScreen: {
    title: "Что-то пошло не так!",
    friendlySubtitle:
      "Это экран, который ваши пользователи увидят в продакшне, когда произойдет ошибка. Вы, вероятно, захотите настроить это сообщение (находится в `app/i18n/ru.ts`) и, возможно, макет (`app/screens/ErrorScreen`). Если вы хотите полностью удалить это, проверьте `app/app.tsx` на наличие компонента <ErrorBoundary>.",
    reset: "СБРОСИТЬ ПРИЛОЖЕНИЕ",
  },
  emptyStateComponent: {
    generic: {
      heading: "Так пусто... так грустно",
      content:
        "Данные пока не найдены. Попробуйте нажать кнопку для обновления или перезагрузите приложение.",
      button: "Давайте попробуем еще раз",
    },
  },
}

export default ru
export type Translations = typeof ru
