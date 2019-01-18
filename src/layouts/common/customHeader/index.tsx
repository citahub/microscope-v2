import * as React from 'react'
import './index.styl'

const Menu = require('rc-menu')
const { SubMenu, MenuItem } = Menu

import 'rc-menu/assets/index.css';

import { hashHistory } from 'react-router';

import { api } from '../../../utils/config'
import { getSelectNetwork,setSelectNetwork } from '../../../utils/storage'

import { isAddress, isBlockHeight, isHash, format0x } from '../../../utils/hex'


class NetWork extends React.Component<any,any>{
  refs: {
    search: HTMLInputElement;
  };
  keyDownListener:any;
  constructor(props:any){
    super(props);
    this.state={
      open: false
    }
  }

  render(){
    var self = this;
    var networks = self.props.networks;
    var selectNetwork = self.props.selectNetwork;

    return (
      <div style={{ position: 'relative' }}>
        <div className=' withRow' style={{ width: 100, paddingTop: 10 }} onClick={()=>{self.setState({open: !self.state.open})}}>
          <div className='operationItem networkName withRowLeftAuto'>{selectNetwork.name}</div>
          <div className='operationItem' style={{ width: 16, paddingLeft: 5 }}>
            <div style={{
              width: 0,
              height: 0,
              borderWidth: 6 ,
              borderStyle: 'solid',
              marginTop: self.state.open?  -6: 'none',
              borderColor: self.state.open? ' transparent transparent black transparent': 'black transparent transparent transparent'
            }}
            ></div>
          </div>

        </div>
        {
          self.state.open?
            <div className='networkOpen'>
                <div>Switch Chain</div>
                <div className='withRow' style={{ marginTop: 14, height: 34 }}>
                  <div className='withRowLeftAuto'>
                    <input placeholder="Please input rebirth service address" type="text" ref='search' className='form-control'
                      onFocus={()=>{
                        self.keyDownListener=(event:any)=>{
                          if(event.keyCode == 13){
                            setSelectNetwork({
                                name: 'customer',
                                url: "https://" + self.refs.search.value.replace("http://","").replace("https://","")
                              })
                              window.location.reload();
                  　　　　 }
                        }
                        window.addEventListener("keydown",self.keyDownListener)
                      }}
                      onBlur={()=>{
                        window.removeEventListener("keydown",self.keyDownListener)
                      }}
                      style={{ height: '100%', padding: "7px 15px 7px 15px", fontSize: 14, color: '#cacdd2' }}/>
                  </div>
                  <div className='networkSwitchButton vhCenter operationItem' onClick={()=>{
                    setSelectNetwork({
                      name: 'customer',
                      url: "https://" + self.refs.search.value.replace("http://","").replace("https://","")
                    })
                    window.location.reload();
                  }}>
                    switch
                  </div>
                </div>
                <div style={{ marginTop: 9 }}>
                  {
                    networks.map(function(item:any){
                      return (
                        <div className='withRow operationItem' style={{ marginTop: 18 }} onClick={()=>{
                          setSelectNetwork(item);
                          window.location.reload();
                        }}>
                          <div style={{ width: 20 }}>
                            <div style={{ marginTop: 6,  width: 8, height: 8, backgroundColor: item.url == selectNetwork.url? '#5b8ee6':'grey', WebkitBorderRadius: '50% 50%' }}></div>
                          </div>
                          <div className='withRowLeftAuto'>
                            <div style={{ color: "#6e737c", fontSize: 14, height: 20 }}>{ item.name}</div>
                            <div style={{ marginTop: 6, color: '#979a9e', fontSize: 12, height: 17 }}>{ item.url}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
            </div>
            : null
        }
      </div>
    )
  }
}

class CustomHeader  extends React.Component<any,any> {
  refs: {
    search: HTMLInputElement;
  }
  keyDownListener:any;
  componentDidMount(){
  }
  onDropdownVisibleChange(){

  }
  onMenuSelectLanguage(){

  }
  query(){
    var self = this;
    var inputValue = self.refs.search.value;
    if(!inputValue)return;

    if(isAddress(inputValue)){
      hashHistory.push("/account/" + format0x(inputValue));
    }else if(isBlockHeight(inputValue)){
      hashHistory.push("/block/id/" + Number(inputValue));
    }else if(isHash(inputValue)){
      hashHistory.push("/transaction/hash/" + format0x(inputValue));
    }else{
      hashHistory.push("/404");
    }

  }
  render() {
    var self = this;
    var networks = api.serverList;
    var languages = ["Chinese","English"];
    var selectNetwork = getSelectNetwork();
    return (
      <div className='customHeader' style={{ paddingTop: 20 }}>
        <div className='withRow container' style={{ height: 41  }}>
          <div className='operationItem' onClick={()=>{hashHistory.push('/')}}><img src='images/headLogo_Microscope.png'/></div>
          <div className='withRowLeftAuto' style={{ fontSize: 16, color: "#47484a", lineHeight: "41px"}}>
              <span className='menu operationItem' onClick={()=>{hashHistory.push('/block/list')}}>区块</span>
              <span className='menu operationItem' onClick={()=>{hashHistory.push('/transaction/list')}}>交易</span>
              {
                // <span className='menu operationItem'>统计</span>
                // <span className='menu operationItem'>设置</span>
              }
          </div>
          <div style={{ width: 360, marginTop: 3, marginBottom: 4, height: 34  }}>
            <div className="input-group">
              <input placeholder="Search by Address / Txhash / Block height" type="text" ref='search' className='form-control'
                onFocus={()=>{
                  self.keyDownListener=(event:any)=>{
                    if(event.keyCode == 13){
            　　　　　　 self.query();
            　　　　 }
                  }
                  window.addEventListener("keydown",self.keyDownListener)
                }}
                onBlur={()=>{
                  window.removeEventListener("keydown",self.keyDownListener)
                }}
                style={{ height: 34, padding: "9px 23px 8px 12px", fontSize: 12 }}/>
              <div className="input-group-append" >
                <span className="input-group-text vhCenter operationItem" style={{ height: 34 , backgroundImage: "linear-gradient(to left, #4eadf1, #6a96f0)"}} onClick={self.query.bind(self)} >
                  <img src="images/head_Search.png" style={{ width: 20 ,height: 20 }}/>
                </span>
              </div>
            </div>
          </div>
          <div>
          <NetWork networks={networks} selectNetwork={selectNetwork}/>
          {
            // <Menu
            //     onClick={()=>{}}
            //     mode="horizontal"
            //     triggerSubMenuAction="click"
            //     onSelect={(d:any)=>{
            //       setSelectNetwork(d.key);
            //       window.location.reload();
            //     }}
            //     >
            //   <SubMenu selectKey={[network]} title={"网络"}>
            //     {
            //       networks.map(function(network){
            //         return   <MenuItem key={network}>{network}</MenuItem>
            //       })
            //     }
            //
            //   </SubMenu>
            // </Menu>
          }
          </div>
          <div>
            {
              // <Menu
              //     onClick={()=>{}}
              //     mode="horizontal"
              //     triggerSubMenuAction="click"
              //     onSelect={(d:any)=>{
              //       console.log(d);
              //     }}
              //     >
              //   <SubMenu key={"Chinese"} title={"语言"}>
              //     {
              //       languages.map(function(language){
              //         return   <MenuItem key={language}>{language}</MenuItem>
              //       })
              //     }
              //
              //   </SubMenu>
              // </Menu>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default CustomHeader;
