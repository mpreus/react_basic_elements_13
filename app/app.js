const Items = [
  {
    code: 2569656303,
    single_price: 4,
    qty: 1,
    name: "Ser Camembert"
  },
  {
    code: 6015390151,
    single_price: 2,
    qty: 2,
    name: "Baton energetyczny"
  },
  {
    code: 6391248461,
    single_price: 2.99,
    qty: 1,
    name: "Masło"
  },
  {
    code: 5350073302,
    single_price: 1.5,
    qty: 3,
    name: "Woda gazowana"
  },
  {
    code: 8676161554,
    single_price: 3.55,
    qty: 1.56,
    name: "Jabłka luz"
  },
  {
    code: 5039291056,
    single_price: 12.49,
    qty: 1,
    name: "Zestaw śniadaniowy"
  }
];

const Header = () => {
	return (
		<div>
			<h1>Twój rachunek</h1>
			<p>Podsumowanie Twoich zakupów</p>
		</div>
	)
}

const Footer = () => {
	return (
		<div>
			<p>Dziękujemy za twoją wizytę!</p>
			<p>Niecierpliwie czekamy na następną!</p>
		</div>
	)
}

/* Kolejne komponenty tabeli:
Header - Items i Item - Footer 
'Receipt' na końcu, po nim już tylko komponent 'App' */
class ReceiptHeader extends React.Component {
	render() {
		return ( // wewnątrz wiersza tabeli dla każdego elementu nagłówka utwórz element 'head' tabeli 
			<thead>
				<tr>
					{this.props.headers.map(headersElement => <th key={headersElement}>{headersElement}</th>) }
				</tr>
			</thead>
		); // nazwy 'headers' przekazujemy w headers = {[...]}) w komponencie 'Receipt'
	}
}

class ReceiptItems extends React.Component {
	render() {			// tworzy wiele wierszy - każdemy przedmiotowi tworzy komponent z nazwą przedmiotu (+ key)
		return (
			<tbody> 
				{this.props.items.map(item => <ReceiptItem key={item.code} item={item}/>) }
			</tbody>
		);
	}
}

class ReceiptItem extends React.Component {
	render() {			// tworzy pojedyńczy wiersz, korzystając z danych poszczególnego 'item'
		// const {item} = this.props; wyeliminowałoby konieczność wpisywania 'this.props' w liniach tworzących 'td'
		return ( 
			<tr>
				<td>{this.props.item.name}</td>
				<td className="shopData">{this.props.item.single_price}</td>
				<td className="shopData">{this.props.item.qty}</td>
				<td className="shopData">{this.props.item.single_price * this.props.item.qty}</td>
			</tr>
		);
	}
}
// tworzy 'footer' zliczając ceny towarów 
class ReceiptFooter extends React.Component {
	render() {
	// const {items} = this.props;
		return ( // w wierszu w kolejnych komórkach wstawia:
			<tfoot>
				<tr>
					<td>RAZEM</td>
					<td className="shopData">-</td>
					<td className="shopData">-</td>
					<td className="shopData">{this.props.items.reduce( (a, c) => (c.single_price * c.qty) + a, 0 ).toFixed(2) }</td>
				</tr>
			</tfoot>
		); 					// 'toFixed([liczba] ogranicza liczbę znaków po przecinku)'
			// cena łączna = cena jednostkowa * liczba przedmiotów + akumulator (początkowo równy '0')
	}
}
// tworzy rachunek w postaci tabeli, przyjmując trzy komponenty z konkretnymi właściwościami
class Receipt extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
					<table>
						<ReceiptHeader headers={this.props.headers} />
						<ReceiptItems items={this.props.items} />
						<ReceiptFooter items={this.props.items} />
					</table>
				<Footer />
			</React.Fragment>
		);
	}
}
// zwraca rachunek jako całość (komponent 'Receipt' z konkretnymi właściwościami
class App extends React.Component {
	render() {
		return <Receipt items={this.props.items} headers={["Nazwa", "Cena", "Ilość", "Łączna cena"]}/>
	}
}
// teraz przekazujemy dane z zaimportowanego pliku:
ReactDOM.render(
	<App items={Items}/>, 
	document.getElementById("root")
);

