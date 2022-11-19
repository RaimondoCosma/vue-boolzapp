'use strict'
const { createApp } = Vue

createApp({
    data() {
        return {
            // Variabile importante relativa all'indice di ogni singolo contatto
            activeUser: 0,
            // Variabile utile per comparare la stringa con i nomi utenti per effettuare una ricerca
            searchingContact: '',
            // Variabile importante relativa all'indice di ogni singolo messaggio di un contatto
            messageClicked: 0,
            // Variabile di inizializzazione del mio messaggio da inviare nella chat
            myMessage: '',
            // Oggetto in cui salvo come proprietà valori utili al contextmenu per mostrarlo o nasconderlo
            styleContextMenu: {
                top: 0,
                left: 0,
                opacity: 0,
                height: 0,
            },
            // Variabile di appoggio per nascondere o mostrare le info dei messaggi
            info: false,
            // Arrey di oggetti contenenti dati degli utenti
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]        
        }
    },
    methods: {
        // Funzione utile a cambiare contatto al click
        changeUser(i) {
            this.activeUser = i;
        },
        // Funzione per ricercare contatti nella barra di ricerca
        searchContact() {
            this.contacts.forEach(contact => {
                const userName = contact.name.toLowerCase();
                if ( userName.includes(this.searchingContact) ){
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },
        // Funzione per mandare messaggi e riceverne uno dopo 2 secondi
        sendMessage(){
            const myNewObjMessage = {
                date: moment().locale('it').format('l '+'LTS'),
                message: this.myMessage,
                status: 'sent'
            }
            if ( this.myMessage !== '' ){
                this.contacts[this.activeUser].messages.push(myNewObjMessage);
            } else {
                return this.sendMessage;
            }
            this.myMessage = '';
            setTimeout(() => {
                const contactNewObjMessage = {
                    date: moment().locale('it').format('l '+'LTS'),
                    message: 'Forse',
                    status: 'received'
                };
                this.contacts[this.activeUser].messages.push(contactNewObjMessage);
            }, 2000);
        },
        // Manipola la stringa della data e ora per estrapolare solo ora e minuti
        messageTime(data) {
            return data.substring(11, 16);
        },
        // Funzione che mostra il contextmenu
        showTheContextMenu(e){
            this.hideTheContextMenu();
            this.closeInfo();
            this.styleContextMenu.top = `${e.clientY}px`;
            this.styleContextMenu.left = `${e.clientX}px`;
            this.styleContextMenu.opacity = 1;
            this.styleContextMenu.height = `76px`;
        },
        // Funzione che nasconde il contextmenu
        hideTheContextMenu(e){
            this.styleContextMenu.top = 0;
            this.styleContextMenu.left = 0;
            this.styleContextMenu.opacity = 0;
            this.styleContextMenu.height = 0;
        },
        // Funzione utile a prelevare l'indice di ogni messaggio
        takeIndexMessage(index){
            this.messageClicked = index;
        },
        // Funzione per cancellare i messaggi
        deleteMessage(){
            this.contacts[this.activeUser].messages.splice(this.messageClicked, 1);
            this.hideTheContextMenu();
        },
        // Funzione per mostrare info messaggi
        showInfo(){
            this.info = true;
            this.hideTheContextMenu();
        },
        // Funzione per chiudere info messaggi
        closeInfo(){
            this.info = false;
        }
    },
    created() {
        const result = axios.get('https://api.chucknorris.io/jokes/random');
    }
}).mount('#app')