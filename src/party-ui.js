import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui';
  } 

  constructor() {
    super();
    this.players = ["You", "ENTER"];
    this.numChar = 2;
    this.startIndex = 0;
    this.ablaze = false;
    this.backArrowBool = false;
    this.forwardArrowBool = false;
  }

  static get styles() {

    return css`

      :host {
        display: flex;

        background-image: url("https://static.vecteezy.com/system/resources/previews/009/877/699/non_2x/pixel-art-night-sky-background-with-clouds-and-stars-for-game-8-bit-vector.jpg");
        justify-content: center; 
        align-items: center; 
        height: 100vh;
      }

      :host([backArrowBool]) .backarrow {
        opacity: 1;
        color: white;
      }
      :host([forwardArrowBool]) .forwardarrow {
        opacity: 1;
        color: white;
      } 
      :host([backArrowBool="true"]) .backarrow:focus, .backarrow:hover {
        animation: blinker .5s linear infinite;
      }   
      :host([forwardArrowBool="true"]) .forwardarrow:focus, .forwardarrow:hover {
        animation: blinker .5s linear infinite;
      }

      /* ignore this it's a secret :) */
      .secret {
        position: relative;
        top: 95px;
        left: 183px;
        
        padding: 5px;
        border: white;
      }

      .lightbg {
        background-color: var(--ddd-theme-default-nittanyNavy);
        padding: var(--ddd-spacing-4);
        height: 525px;
        width: 975px;
        display: flex;
        border: 3px solid var(--ddd-theme-default-slateLight);

        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .darkbg {
        background-color: var(--ddd-theme-default-beaverBlue);
        height: 510px;
        width: 925px;
        margin-top: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        border: 3px solid var(--ddd-theme-default-skyMaxLight);
      }

      .addbtn {
        border: var(--ddd-spacing-1) dashed white;
        padding: var(--ddd-spacing-3) var(--ddd-spacing-3);
        text-align: center;
        color: white;
        font-family: "Press Start 2P", system-ui;
        margin-right: var(--ddd-spacing-6);

        transition: .3s all ease-in-out;
      }

      .addsymbl {
        font-size: 50px;
        margin: var(--ddd-spacing-6);
        background-color: transparent;
        border: transparent;
        color: white;

        transition: .3s all ease-in-out;
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
        margin-bottom: var(--ddd-spacing-3);
      }

      .nametf {
        background: transparent;
        color: white;
        font-family: "Press Start 2P", system-ui;
        text-align: center;
        border: transparent;
        font-size: 25px;
        width: 150px;
        margin-top: var(--ddd-spacing-4);
        outline: none;
      }

      .nameline {
        border-top: var(--ddd-spacing-1) solid var(--ddd-theme-default-limestoneGray);
        margin: var(--ddd-spacing-0) var(--ddd-spacing-5);
      }

      .btnwrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: var(--ddd-spacing-3);
      }

      .savebtn {
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .removebtn {
        margin-top: var(--ddd-spacing-4);
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .bottombtnwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 40%;
      }
      
      .title,
      .finishbtn,
      .firebtn {
        text-align: center;
        margin-top: var(--ddd-spacing-8);
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
        color: black;
        opacity: .2;
        margin-top: var(--ddd-spacing-20);
        background-color: transparent;
        border:  transparent;
      }

      .title {
        font-size: 50px;
        animation: blinker2 2s linear infinite;
      }
      
      .removebtn:focus,
      .removebtn:hover,
      .savebtn:focus,
      .savebtn:hover,
      .finishbtn:focus,
      .finishbtn:hover,
      .firebtn:focus,
      .firebtn:hover {
        animation: blinker .5s linear infinite;
      }
      
      .addsymbl:focus,
      .addsymbl:hover,
      .addbtn:focus,
      .addbtn:hover {
        color: var(--ddd-theme-default-potential50);
        border-color: var(--ddd-theme-default-potential50);
      }

      @keyframes blinker {
        50% {
          opacity: 0;
        }
      }
      @keyframes blinker2 {
        50% {
          opacity: 0;
        }
      }
    `;
  }

  //Makes it rain confetti and makes the players animate when savebtn is pressed
  makeItRain() {

    if (!this.players.includes("ENTER")) {
      window.alert(this.players + " have been added to your project!");

      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('walking', '');
      });
      
      import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
        (module) => {
          setTimeout(() => {
            this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
          }, 0);
        }
      );
    } else {
      window.alert("There is a player that has not been filled out!");
    }

   
  }
  
  //Adds a new player at the end of the list
  add(e) {

    this.noWalk();

    this.players.push("ENTER");
    this.numChar++;

    if (this.numChar > 4) {
      this.startIndex++;
    }
    this.updateArrowStyles();
    this.requestUpdate(); 
  }

  //Removes the player selected from the list
  remove(index) {

    this.noWalk();
    
    if (this.numChar > 1) {
      this.players.splice(index, 1); 
      this.numChar--;

      if (this.startIndex != 0) {
        this.startIndex--;
      }
      this.updateArrowStyles();
      this.requestUpdate(); 
    } 
  }

  //Saves the player's new name if there are no caps, spaces, special chars, repeat names
  //Otherwise it provides an alert message and sets the name to the default "ENTER"
  saveName(e, index) {

    this.noWalk();

    const newName = e.target.value;
    this.players[index] = "ENTER";
    if (/^[a-z0-9]{1,10}$/.test(newName)) {
      if (!this.players.includes(newName)) {
        
        this.players[index] = newName;
        
      } else {
        window.alert("Player is already added!");
        this.players[index] = "ENTER";
      }
    } else {
      window.alert("Name can only have lowercase letters and numbers!\n No spaces either!");
      this.players[index] = "ENTER";
    }

    this.requestUpdate();
  }

  //Everytime something is typed in a text field it updates the player
  updateName(e, index) {

    this.noWalk();

    const newName = e.target.value;
    this.players[index] = newName;
    if (newName !== "") {
      this.requestUpdate();
    }
  }

  //Moves the list of viewable players down 1
  moveBack() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.updateArrowStyles();
      this.requestUpdate();
    }
  }
  
  //Moves the list of viewable players up 1
  moveForward() {
    if (this.startIndex < this.players.length - 4) {
      this.startIndex++;
      this.updateArrowStyles();
      this.requestUpdate();
    }
  }

  //Removes walking animation if something changes (add/remove char, etc)
  noWalk() {
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.removeAttribute('walking');
    });
  }

  //Sets fire to the players
  setAblaze() {
    if (!this.ablaze) {
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('fire', '');
      });
      this.ablaze = !this.ablaze;

    } else {
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.removeAttribute('fire');
      });
      this.ablaze = !this.ablaze;
    }
  }

  //Updates arrows when they are clickable
  updateArrowStyles() {

    if (this.startIndex > 0) {
      this.backArrowBool = true;
    } else {
      this.backArrowBool = false;
    }

    if (this.startIndex < this.players.length - 4) {
      this.forwardArrowBool = true;
    } else {
      this.forwardArrowBool = false;
    }

    this.requestUpdate();
  }
  
  render() {

    //Only shows a max of 4 players at a time (for screen fitting purposes)
    const visPlayers = this.players.slice(this.startIndex, this.startIndex + 4);

    return html`
      <div class="project1">
        <div class="title">PRESS START</div>
        <div class="lightbg">
          <confetti-container id="confetti">
            <div class="darkbg">
              <div class="charlist">

              <!-- Back arrow that only appears if there are players with a low index that are hidden -->
                <button @click="${this.moveBack}" class="backarrow"><</button>

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
                <button @click="${this.moveForward}" class="forwardarrow">></button>
              </div>

              <!-- Save button that runs the confetti -->
              <div class="bottombtnwrap">
                <button @click="${this.setAblaze}" class="firebtn">> FIRE IN THE HOLE!</button>
                <button @click="${this.makeItRain}" class="finishbtn">> START JOURNEY</button>
              </div>
            </div>
          </confetti-container>
        </div>
      </div>

      <!-- a super secrety secret (its a secret) -->
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        <button class="secret"></button>
      </a>
    `;
  }
  
  static get properties() {
    return {
        players: { type: Array },
        numChar: { type: Number, reflect: true},
        startIndex: { type: Number, reflect: true},
        walkingBool: { type: Boolean, reflect: true},
        ablaze: { type: Boolean, reflect: true},
        backArrowBool: { type: Boolean, reflect: true},
        forwardArrowBool: { type: Boolean, reflect: true},
    };
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);
