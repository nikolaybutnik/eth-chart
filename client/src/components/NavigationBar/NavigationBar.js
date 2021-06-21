import React, { useEffect } from 'react'
import { getCurrencyData } from '../../utils/ServerCalls'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'
import './NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

const NavigationBar = ({
  props: {
    favStatus,
    setSymbolData,
    setSymbol,
    setPairSymbol,
    favorites,
    setFavorites,
    toggleBinanceData,
    setToggleBinanceData,
    toggleKucoinData,
    setToggleKucoinData,
    toggleKrakenData,
    setToggleKrakenData,
  },
}) => {
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favStatus, setFavorites])

  const handleFetchGraph = (e) => {
    const [symbol, pair] = e.target.textContent.split('/')
    setSymbol(symbol) // Note: available pairs are auto fetched on setSymbol in SearchForm.js
    setPairSymbol(pair)
    getCurrencyData(symbol, setSymbolData)
  }

  return (
    <Navbar collapseOnSelect className="colorNav" expand="sm" variant="light">
      <Navbar.Brand href="/" className="appName">
        CryptoGraph
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Favorites" id="collasible-nav-dropdown">
            {favorites && favorites.length === 0 && (
              <NavDropdown.Item>You have no favorites saved</NavDropdown.Item>
            )}
            {favorites &&
              favorites.map((item) => {
                return (
                  <NavDropdown.Item
                    key={`${item.symbol}/${item.pair}`}
                    onClick={(e) => handleFetchGraph(e)}
                  >{`${item.symbol}/${item.pair}`}</NavDropdown.Item>
                )
              })}
          </NavDropdown>
          <NavDropdown title="Markets" id="collasible-nav-dropdown">
            <NavDropdown.ItemText>
              <label htmlFor="binanceStatus">Binance</label>
              <Toggle
                className="binanceStatus"
                defaultChecked={toggleBinanceData}
                onChange={() => setToggleBinanceData(() => !toggleBinanceData)}
              />
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <label htmlFor="kucoinStatus">KuCoin</label>
              <Toggle
                className="kucoinStatus"
                defaultChecked={toggleKucoinData}
                onChange={() => setToggleKucoinData(() => !toggleKucoinData)}
              />
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <label htmlFor="krakenStatus">Kraken</label>
              <Toggle
                className="krakenStatus"
                defaultChecked={toggleKrakenData}
                onChange={() => setToggleKrakenData(() => !toggleKrakenData)}
              />
            </NavDropdown.ItemText>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
