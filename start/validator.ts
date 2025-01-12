import vine, { SimpleMessagesProvider } from '@vinejs/vine';

vine.messagesProvider = new SimpleMessagesProvider({
	required: 'Ce champ est requis',
	string: 'La valeur du champ {{ field }} doit être une chaîne',
	regex: "La valeur n'est pas valide",
});
