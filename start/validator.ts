import vine, { SimpleMessagesProvider } from '@vinejs/vine';

vine.messagesProvider = new SimpleMessagesProvider({
	required: 'Ce champ est requis',
	string: 'La valeur du champ {{ field }} doit être une chaîne',
	email: "La valeur n'est pas une adresse email valide",
	regex: "La valeur n'est pas valide",
});
