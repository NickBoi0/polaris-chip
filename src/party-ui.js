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
  }

  static get styles() {

    return css`

      :host {
        display: inline-flex;
      }

      .lightbg {
        background-color: var(--ddd-theme-default-beaver70);
        padding: 10px;
        margin: 100px;
        display: flex;

        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .darkbg {
        background-color: var(--ddd-theme-default-beaverBlue);
        padding: 75px 150px;
        bottom: -10px;
        margin-bottom: -20px;
      }

      .addbtn {
        border: 3px dashed white;
        padding: 10px 10px;
        text-align: center;
        color: white;
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
      }

      .nameline {
        border-top: 3px solid #bbb;
        margin: 0px 20px;
      }

      .btnwrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .savebtn {
        margin-top: 15px;
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
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  
  add(e) {
    if (this.numChar < 4) {
      this.players.push("");
      this.numChar++;
      this.requestUpdate(); 
    } 
  }

  remove(index) {
    if (this.numChar > 1) {
      this.players.splice(index, 1); 
      this.numChar--;
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
  
  render() {
    return html`
      <div class="project1">
        <div class="lightbg">
          <confetti-container id="confetti">
            <div class="darkbg">
              <div class="charlist">
                ${this.players.map((player, index) => html`
                  <div class="chars">
                    <div class="character-wrapper">
                      <rpg-character seed="${player}"></rpg-character>
                    </div>
                    <input type="text" class="nametf" .value="${player || 'ENTER'}" @change="${(e) => this.saveName(e, index)}">
                    <div class="nameline"></div>
                    <div class="btnwrapper">
                      ${index > 0 ? html`
                        <button @click="${() => this.saveName(index, this.shadowRoot.querySelector(`#name-${index}`).value)}" class="savebtn">> SAVE</button>
                        <button @click="${() => this.remove(index)}" class="removebtn">> REMOVE</button>
                      ` : ''}
                    </div>
                  </div>
                `)}
                <div class=addbtn>
                  <button @click="${this.add}" class="addsymbl">+</button>
                  <div class="numchar">${this.numChar}/4 <br> Added</div>
                </div>
              </div>
              <button @click="${this.makeItRain}" class="finishbtn">> SAVE PLAYERS</button>
            </div>
          </confetti-container>
        </div>
      </div>
    `;
  }
  
  static get properties() {
    return {
        players: { type: Array },
        numChar: { type: Number, reflext: true},
    };
  }s
}

globalThis.customElements.define(PartyUI.tag, PartyUI);
