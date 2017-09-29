import * as dialogsModule from 'ui/dialogs';

export function alert(message: string, title?: string) {
  return dialogsModule.alert({
    title: title || 'Groceries',
    okButtonText: 'OK',
    message: message
  });
}
