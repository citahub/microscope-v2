import * as React from 'react'
import './index.styl'

import Menu, {SubMenu, MenuItem} from 'rc-menu';
import 'rc-menu/assets/index.css';

import { hashHistory } from 'react-router';

import { api } from '../../../utils/config'
import { getSelectNetwork,setSelectNetwork } from '../../../utils/storage'

class CustomHeader  extends React.Component {
  componentDidMount(){
  }
  onDropdownVisibleChange(){

  }
  onMenuSelectLanguage(){

  }
  render() {
    var self = this;
    var networks = api.serverList;
    var languages = ["Chinese","English"];
    var network = getSelectNetwork();
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
              <input placeholder="Search by Address / Txhash / Block / Token / Ens" type="text" className='form-control'  style={{ height: 34, padding: "9px 23px 8px 12px", fontSize: 12, color: "#cacdd2" }}/>
              <div className="input-group-append" >
                <span className="input-group-text vhCenter operationItem" style={{ height: 34 , backgroundImage: "linear-gradient(to left, #4eadf1, #6a96f0)"}} onClick={()=>{

                }}>
                  <img src="images/head_Search.png" style={{ width: 20 ,height: 20 }}/>
                </span>
              </div>
            </div>
          </div>
          <div>
            <Menu
                onClick={()=>{}}
                mode="horizontal"
                triggerSubMenuAction="click"
                onSelect={(d:any)=>{
                  setSelectNetwork(d.key);
                  window.location.reload();
                }}
                >
              <SubMenu selectKey={[network]} title={"网络"}>
                {
                  networks.map(function(network,i){
                    return   <MenuItem key={network}>{network}</MenuItem>
                  })
                }

              </SubMenu>
            </Menu>
          </div>
          <div>
            <Menu
                onClick={()=>{}}
                mode="horizontal"
                triggerSubMenuAction="click"
                onSelect={(d:any)=>{

                }}
                >
              <SubMenu key={"Chinese"} title={"语言"}>
                {
                  languages.map(function(language,i){
                    return   <MenuItem key={language}>{language}</MenuItem>
                  })
                }

              </SubMenu>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomHeader;
