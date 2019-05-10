class Calculator extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        isEnemy : false,
        selectedChampion : this.props.selectedChampion,
        championData : this.props.championData,
        enemyChampion : null,
        enemyData : null,

        aadamage: null,
        aatype: null,

        qdamage: null,
        qtype: null,

        wdamage: null,
        wtype: null,

        edamage: null,
        etype: null,

        rdamage: null,
        rtype: null,
        
    }

    onClick(champion) {
        fetch(`/choose?id=${champion.id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    enemyChampion : champion,
                    isEnemy : true,
                    enemyData : res
                })
            })
            .catch((err) => {
                return <div> {err} </div>
            });
    }

    calculate(){
        var body = {
            "player" : {
                "id" : this.state.selectedChampion.id,
                "hp" : this.state.championData.hp,
                "mp" : this.state.championData.mp,
                "movespeed" : this.state.championData.movespeed,
                "armor" : this.state.championData.armor,
                "spellblock" : this.state.championData.spellblock,
                "attackdamage" : this.state.championData.attackdamage,
                "spelldamage" : this.state.championData.spelldamage,
                "attackspeed" : this.state.championData.attackspeed,
                "flatarmorpenetration" : this.state.championData.flatarmorpenetration,
                "percentarmorpenetration" : this.state.championData.percentarmorpenetration,
                "flatspellpenetration" : this.state.championData.flatspellpenetration,
                "percentspellpenetration" : this.state.championData.percentspellpenetration,
                "qlevel" : this.state.championData.qlevel,
                "wlevel" : this.state.championData.wlevel, 
                "elevel" : this.state.championData.elevel,
                "rlevel" : this.state.championData.rlevel
                },
            "enemy" : {
                "hp" : this.state.enemyData.hp,
                "armor" : this.state.enemyData.armor,
                "spellblock" : this.state.enemyData.spellblock
            }
        }
        console.log(body)
        fetch(`/calculate`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('getting new data')
                this.setState({
                    aadamage : res.aa[0].damage,
                    aatype : res.aa[0].type,
                    qdamage : res.aa[0].damage,
                    qtype : res.aa[0].type,
                    wdamage : res.aa[0].damage,
                    wtype : res.aa[0].type,
                    edamage : res.aa[0].damage,
                    etype : res.aa[0].type,
                    rdamage : res.aa[0].damage,
                    rtype : res.aa[0].type
                })
                console.log(this.state.aadamage)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        return (
            <section className="section">
                <PlayerChampion champions={this.props.champions} championData={this.state.championData} selectedChampion={this.state.selectedChampion} items={this.props.itemData} />
                <section className="section">
                    <div className="container">
                        <div id='ChampionSkills' className='level'>
                            <ChampionAbility icon={this.state.championData.qicon} damage={this.state.qdamage} type={this.state.qtype}/>
                            <ChampionAbility icon={this.state.championData.wicon} damage={this.state.wdamage} type={this.state.wtype}/>
                            <ChampionAbility icon={this.state.championData.eicon} damage={this.state.edamage} type={this.state.etype}/>
                            <ChampionAbility icon={this.state.championData.ricon} damage={this.state.rdamage} type={this.state.rtype}/>
                            <ChampionAbility icon={this.state.championData.passiveicon} damage={this.state.aadamage} type={this.state.aatype}/>
                        </div>
                    </div>
                </section>
                <button className={'button'} onClick={()=>{this.calculate()}}>
                    Calculate
                </button>
                {this.state.isEnemy ? <EnemyChampion champions={this.props.champions} championData={this.state.enemyData} selectedChampion={this.state.enemyChampion} /> : null}
                <section className="section">
                    <div className="container has-text-centered">
                        <div className="column is-half is-offset-6">
                        <input className='input' placeholder='Select an enemy...' type="text" id="userInput" onInput={()=>{search('ChampionList','userInput')}}></input>
                            <div id='ChampionListContainer'>
                                <ChampionList onClick={this.onClick.bind(this)} champions={this.props.champions}/>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}