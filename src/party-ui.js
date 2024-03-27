import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui';
  } 

  constructor() {
    super();
    this.players = ["You"];
    this.numChar = 1;
    this.startIndex = 0;

    this.soundEffects = {
      victory: new Audio('"C:\Users\nicky\Downloads\winsquare-6993.mp3"'),
    };

  }

  static get styles() {

    return css`

      :host {
        display: flex;
        justify-content: center; 
        align-items: center; 
        height: 100vh;
      }

      .lightbg {
        background-color: var(--ddd-theme-default-beaver70);
        padding: 10px;
        height: 500px;
        width: 950px;
        display: flex;

        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .darkbg {
        background-color: var(--ddd-theme-default-beaverBlue);
        height: 500px;
        width: 925px;
        padding: 10px;
      }

      .addbtn {
        border: 3px dashed white;
        padding: 10px 10px;
        text-align: center;
        color: white;
        font-family: "Press Start 2P", system-ui;
        margin-right: 25px;
      }

      .addsymbl {
        font-size: 50px;
        margin: 25px 0px 0px 0px;
        background-color: transparent;
        border: transparent;
        color: white;
      }
      
      .numchar {
        font-size: 18px;
        font-family: "Press Start 2P", system-ui;
      }

      .charlist {
        display: flex;
        justify-content: center;
      }

      .chars {
        text-align: center;
      }

      .character-wrapper {
        margin-bottom: 10px;
      }

      .nametf {
        background: transparent;
        color: white;
        font-family: "Press Start 2P", system-ui;
        text-align: center;
        border: transparent;
        font-size: 25px;
        width: 150px;
        margin-top: 10px;
        outline: none;
      }

      .nameline {
        border-top: 3px solid #bbb;
        margin: 0px 20px;
      }

      .btnwrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
      }

      .savebtnwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 40%;
      }

      .savebtn {
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .removebtn {
        margin-top: 15px;
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .finishbtn {
        margin-top: 100px;
        background: transparent;
        border: transparent;
        color: white;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
      }

      .backarrow,
      .forwardarrow {
        font-family: "Press Start 2P", system-ui;
        font-size: 65px;
        color: white;
        margin-top: 80px;
        background-color: transparent;
        border: transparent;
      }
      
      .backarrow:focus,
      .backarrow:hover,
      .forwardarrow:focus,
      .forwardarrow:hover,
      .removebtn:focus,
      .removebtn:hover,
      .addsymbl:focus,
      .addsymbl:hover,
      .savebtn:focus,
      .savebtn:hover,
      .finishbtn:focus,
      .finishbtn:hover {
        animation: blinker .5s linear infinite;
      }

      @keyframes blinker {
        50% {
          opacity: 0;
        }
      }
    `;
  }

  
  makeItRain() {
    this.playVictorySound()
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  
  add(e) {
    this.players.push("");
    this.numChar++;

    if (this.numChar > 4) {
      this.startIndex++;
    }

    this.requestUpdate(); 
  }

  remove(index) {
    if (this.numChar > 1) {
      this.players.splice(index, 1); 
      this.numChar--;

      if (this.startIndex != 0) {
        this.startIndex--;
      }
      
      this.requestUpdate(); 
    } 
  }

  saveName(e, index) {
    const newName = e.target.value;
    if (newName.trim() !== "") {
      this.players[index] = newName;
    } else {
      this.players[index] = "ENTER";
    }
    this.requestUpdate();
  }

  updateName(e, index) {
    const newName = e.target.value;
    this.players[index] = newName;
    if (newName !== "") {
      this.requestUpdate();
    }
  }

  moveBack() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.requestUpdate();
    }
  }
  
  moveForward() {
    if (this.startIndex < this.players.length - 4) {
      this.startIndex++;
      this.requestUpdate();
    }
  }

  playVictorySound() {
    this.soundEffects.victory.play();
  }
  
  render() {

    //Only shows a max of 4 players at a time (for screen fitting purposes)
    const visPlayers = this.players.slice(this.startIndex, this.startIndex + 4);

    return html`
      <div class="project1">
        <div class="lightbg">
          <confetti-container id="confetti">
            <div class="darkbg">
              <div class="charlist">

              <!-- Back arrow that only appears if there are players with a low index that are hidden -->
                ${this.startIndex > 0 ? html`
                  <button @click="${this.moveBack}" class="backarrow"><</button>
                ` : ''}

                <!-- Creates a map from the player list so that each player is displayed with the same design -->
                ${visPlayers.map((player, index) => html`
                  <div class="chars">
                    <div class="character-wrapper">
                      <rpg-character seed="${player}"></rpg-character>
                    </div>

                    <!-- Allows you to enter in any player's name with realtime changes to the player -->
                    <input type="text" class="nametf" .value="${player || "ENTER"}"  @input="${(e) => this.updateName(e, index + this.startIndex)}" @change="${(e) => this.saveName(e, index + this.startIndex)}">
                    
                    <div class="nameline"></div>
                    <div class="btnwrapper">

                    <!-- Save and delete button only appear on players who aren't you (first index) -->
                      ${index + this.startIndex > 0 ? html`
                        <button class="savebtn">> SAVE</button>
                        <button @click="${() => this.remove(index + this.startIndex)}" class="removebtn">> REMOVE</button>
                      ` : ''}


                    </div>
                  </div>
                `)}

                <!-- The add button to add new players -->
                <div class=addbtn>
                  <button @click="${this.add}" class="addsymbl">+</button>
                  <div class="numchar">${this.numChar} <br> Added</div>
                </div>

                <!-- Forward arrow that only appears if there are players with a high index that are hidden -->
                ${this.startIndex < this.players.length - 4 ? html`
                  <button @click="${this.moveForward}" class="forwardarrow">></button>
                ` : ''}
              </div>

              <!-- Save button that runs the confetti -->
              <div class="savebtnwrap">
                <button @click="${this.makeItRain}" class="finishbtn">> SAVE PLAYERS</button>
              </div>
            </div>
          </confetti-container>
        </div>
      </div>
    `;
  }
  
  static get properties() {
    return {
        players: { type: Array },
        numChar: { type: Number, reflect: true},
        startIndex: { type: Number, reflect: true},
    };
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);
