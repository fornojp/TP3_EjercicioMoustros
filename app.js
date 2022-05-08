new Vue({
  el: "#app",
  data: {
    saludJugador: 100,
    saludMonstruo: 100,
    hayUnaPartidaEnJuego: false,
    turnos: [], //es para registrar los eventos de la partida
    esJugador: false,
    rangoAtaque: [3, 10],
    rangoAtaqueEspecial: [10, 20],
    rangoAtaqueDelMonstruo: [5, 12],
  },
  methods: {
    getSalud(salud) {
      return `${salud}%`;
    },
    atacar() {
      let daño = this.calcularHeridas(this.rangoAtaque[0], this.rangoAtaque[1]);
      this.saludMonstruo -= daño;
      this.ataqueDelMonstruo();
      this.verificarGanador();
      if (this.saludJugador < 100) {
        this.turnos.unshift({
          esJugador: true,
          text: "El jugador golpeo al moustro por " + daño + "%",
        });
      }
      console.log(this.saludJugador, daño);
    },

    ataqueEspecial() {
      let daño = this.calcularHeridas(
        this.rangoAtaqueEspecial[0],
        this.rangoAtaqueEspecial[1]
      );
      this.saludMonstruo -= daño;
      this.ataqueDelMonstruo();
      if (this.saludJugador < 100) {
        this.turnos.unshift({
          esJugador: true,
          text: "El jugador golpeo al moustro por " + daño + "%",
        });
      }
      this.verificarGanador();
    },

    curar() {
      if (this.saludJugador <= 90) {
        this.saludJugador += 10;
      } else {
        this.saludJugador = 100;
      }
      this.ataqueDelMonstruo();
      this.turnos.unshift({
        esJugador: true,
        text: "El jugador se curo por " + 10 + "%",
      });
    },

    ataqueDelMonstruo() {
      let daño = this.calcularHeridas(
        this.rangoAtaqueDelMonstruo[0],
        this.rangoAtaqueDelMonstruo[1]
      );
      this.saludJugador -= daño;
      this.verificarGanador();
      if (this.saludJugador < 100) {
        this.turnos.unshift({
          esJugador: false,
          text: "El Moustro golpeo al Jugador por " + daño + "%",
        });
      }
    },

    calcularHeridas(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    verificarGanador() {
      //   let rto = false;
      if (this.saludMonstruo <= 0) {
        if (confirm("Ganaste!!! , Jugar de nuevo?")) {
          this.empezarPartida();
        } else {
          this.terminarPartida();
        }
        // rto = true;
      } else if (this.saludJugador <= 0) {
        if (confirm("Perdiste!!! , Jugar de nuevo?")) {
          this.empezarPartida();
        } else {
          this.terminarPartida();
        }
        // rto = true;
      }
      //   return rto;
    },
    empezarPartida() {
      this.turnos = [];
      this.hayUnaPartidaEnJuego = true;
      this.saludJugador = 100;
      this.saludMonstruo = 100;
    },
    terminarPartida() {
      this.turnos = [];
      this.hayUnaPartidaEnJuego = false;
    },
    cssEvento(turno) {
      //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
      return {
        "player-turno": turno.esJugador,
        "monster-turno": !turno.esJugador,
      };
    },
  },
});
