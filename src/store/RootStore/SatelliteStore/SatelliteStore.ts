import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  observe,
} from "mobx";

import axios from "axios";

import { RoverData, MoveData, ImmersionData } from "./types";

export interface ISatelliteStore {
  putMove(): Promise<void>;
  getInfo(): Promise<void>;
  // setMap(): Promise<void>
}

type PrivateFields = "_rover" | "_move" | "_immersion";

export default class SatelliteStore implements ISatelliteStore {
  private _rover = {
    uuid: "",
    name: "",
    x: 0,
    y: 0,
    z: 0,
    charge: 0,
    temperature: 0,
    warning: 'none'
  };

  private _move = {
    uuid: "",
    x: 0,
    y: 0,
    z: 0,
  };

  private _immersion = {
    uuid: "",
    move: "",
    depth: 0,
  };

  private _socket: WebSocket | null = null;
  private _mapSocket: WebSocket | null = null;
  private _initWebSocket() {
    this._socket = new WebSocket("ws://192.168.137.68:8080/ws");

    this._socket.onopen = () => {
      console.log("WebSocket соединение открыто");
    };

    this._socket.onmessage = (event) => {
      console.log("Получено сообщение:", event.data);

      runInAction(() => {
        this._rover = JSON.parse(event.data);
        console.log("data", this._rover);
      });
    };

    this._socket.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };
  }

  private _initMapSocket() {
    this._mapSocket = new WebSocket("ws://192.168.137.68:8080/ws/map");

    this._mapSocket.onopen = () => {
      console.log("WebSocket соединение открыто");
    };

    this._mapSocket.onmessage = (event) => {
      console.log("Получено сообщение:", event.data);

      runInAction(() => {
        this._rover = JSON.parse(event.data);
        console.log("data", this._rover);
      });
    };

    this._mapSocket.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };
  }

  // public setRover = (value: RoverData) => {
  //     this._rover = value;
  //     this.putRover()
  // }

  public setMove = (value: MoveData) => {
    this._move = value;
    // console.log('set move', value)
    this.putMove();
  };

  public setImmersion = (value: ImmersionData) => {
    this._immersion = value;
    console.log("set imm", value.move, value.depth);
    this.putImmersion();
  };

  // public setIsError = (value: boolean) => {
  //   this._isError = value;
  // };

  constructor() {
    // this.setMap()

    makeObservable<SatelliteStore, PrivateFields>(this, {
      _rover: observable,
      _move: observable,
      _immersion: observable,
      // _isError: observable,
      rover: computed,
      immersion: computed,
      // setRover: action
      setImmersion: action,
    });
    this._initWebSocket();
    this._initMapSocket();
  }

  get rover(): RoverData {
    return this._rover;
  }
  // get isError(): boolean {
  //   return this._isError;
  // }

  get move(): MoveData {
    return this._move;
  }

  get immersion(): ImmersionData {
    return this._immersion;
  }

  async putMove(): Promise<void> {
    console.log("put");

    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify(this._move);
      this._socket.send(payload);
    }
  }

  async putImmersion(): Promise<void> {
    console.log("put imm");

    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify(this.immersion);
      this._socket.send(payload);
    }
  }

  async getInfo(): Promise<void> {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      //   // Отправка GET-запроса через WebSocket
      //   this._socket.send('GET_INFO');
      console.log("get info");
    }
  }

  // async setMap(): Promise<void> {
  //     // axios.get('http://192.168.137.68:8080/map')
  //     // .then(response => {
  //     //     // Обработка успешного ответа
  //     //     console.log(response.data);
  //     // })
  //     // .catch(error => {
  //     //     // Обработка ошибок
  //     //     console.error(error);
  //     // });

  // try {
  //     const response = await fetch('http://192.168.137.68:8080/map');
  //     if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     console.log(data);
  // } catch (error) {
  //     console.error(error);
  // }
  // }
  //   if (this._socket && this._socket.readyState === WebSocket.OPEN) {
  //     const payload = JSON.stringify(this.immersion);
  //     this._socket.send(payload);
  //   }
  // }

  // async getInfo(): Promise<void> {
  //   if (this._socket && this._socket.readyState === WebSocket.OPEN) {
  //     //   // Отправка GET-запроса через WebSocket
  //     //   this._socket.send('GET_INFO');
  //     console.log("get info");
  //   }
  // }
}
