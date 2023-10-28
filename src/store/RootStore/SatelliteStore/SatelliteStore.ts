import { action, computed, makeObservable, observable, runInAction, observe } from 'mobx';

import { RoverData } from './types';

export interface ISatelliteStore {
    putRover(): Promise<void>;
    getInfo(): Promise<void>;
}

type PrivateFields = '_rover'

export default class SatelliteStore implements ISatelliteStore {
    private _rover = {
        uuid: '',
        name: '',
        x: 0,
        y: 0,
        angle: 0,
        charge: 0,
    }

    private _socket: WebSocket | null = null;
    private _initWebSocket() {
        this._socket = new WebSocket('ws://192.168.137.68:8080/ws');
    
        this._socket.onopen = () => {
          console.log('WebSocket соединение открыто');
        };
    
        this._socket.onmessage = (event) => {
            console.log('Получено сообщение:', event.data);
            
            runInAction(() => {
                this._rover = JSON.parse(event.data);
                console.log('data', this._rover)
            });
          };
    
        this._socket.onclose = () => {
          console.log('WebSocket соединение закрыто');
        };


      }

    public setRover = (value: RoverData) => {
        this._rover = value;
        this.putRover()
    }


    constructor() {
        makeObservable<SatelliteStore, PrivateFields>(this, {
            _rover: observable,
            rover: computed,
            setRover: action
        });
        this._initWebSocket();
    }    

    get rover(): RoverData {
        return this._rover;
    }

    async putRover(): Promise<void> {
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
        //   const payload = JSON.stringify(this._position);
        //   this._socket.send(payload);
        }
    }
    
    async getInfo(): Promise<void> {
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
        //   // Отправка GET-запроса через WebSocket
        //   this._socket.send('GET_INFO');
        console.log('get info')
        }
    }
}