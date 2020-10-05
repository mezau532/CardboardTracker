import React from 'react';
import eBay from 'ebay-node-api';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),
            width: '100%',
            orientation: "vertical",
            alignItems: "center"
        }
    },
    entry: {
        textAlign: "center",
        width: 200
    },
    button: {
        textAlign: "center",
        backgroundColor: '#0c2340',
        marginLeft: 70,
        marginTop: -5,
        width: 100
    },
}));

export default function ChartsPage() {
    const basketballCategoryId = 214;
    const footballCategoryId = 215;
    const baseballCategoryId = 213;
    const soccerCategoryId = 183444;

    const classes = useStyles();
    const [year, setYear] = React.useState(2019);
    const [product, setProduct] = React.useState();
    const [player, setPlayer] = React.useState();
    const [category, setCategory] = React.useState(basketballCategoryId);
    const [yearError, setYearError] = React.useState(false);
    const [productError, setProductError] = React.useState(false);
    const [playerError, setPlayerError] = React.useState(false);
    const [itemList, setItemList] = React.useState(new Array());
    const [maxY, setMaxY] = React.useState(0);
    let ebay = new eBay({clientID: ""});

    const playerValid = player && player.length > 0;
    const productValid = product && product.length > 0;

    function goClicked(e)
    {
        let hasError = false;
        if (!year)
        {
            hasError = true;
            setYearError(true);
        }
        if (!playerValid)
        {
            hasError = true;
            setPlayerError(true);
        }
        if (!productValid)
        {
            hasError = true;
            setProductError(true);
        }

        if (!hasError)
        {
            let keywords = year.toString() + ' ' + product + ' ' + player + ' PSA 10';
            console.log(keywords);
            ebay.findCompletedItems({
                keywords: keywords,
                sortOrder: 'EndTimeSoonest',
                categoryId: category.toString(),
                SoldItemsOnly: true,
                limit: 10
            }).then((data) => {
                console.log(data);
                let itemList = new Array();
                let largestY = 0;
                let list = ((data[0])["searchResult"])[0]["item"];
                let i = 0;
                for (i = 0; i < list.length; i++)
                {
                    let sTime = new Date(list[i]["listingInfo"][0]["endTime"][0]);
                    let sPrice = list[i]["sellingStatus"][0]["currentPrice"][0]["__value__"];
                    let sPriceCurrency = list[i]["sellingStatus"][0]["currentPrice"][0]["@currencyId"];
                    let sState = list[i]["sellingStatus"][0]["sellingState"][0];
                    let listTitle = list[i]["title"][0];
                    // dont include items that include questionmark
                    if (!listTitle.includes('?') && !listTitle.includes('X1') && !listTitle.includes('X2') && !listTitle.includes('X3') && !listTitle.includes('X4') && !listTitle.includes('X5')
                    && !listTitle.includes('X6') && !listTitle.includes('X7') && !listTitle.includes('X8') && !listTitle.includes('X9') && !listTitle.includes('X10') && !listTitle.includes('Lot'))
                    {
                        if (parseInt(sPrice) > largestY)
                        {
                            largestY = sPrice;
                        }
                        itemList.push({
                            x: sTime,
                            y: sPrice,
                            sellState: sState,
                            priceCurrency: sPriceCurrency,
                            title: listTitle
                        });
                    }
                    else
                    {
                        console.log(listTitle)
                    }
                }
                setMaxY(largestY);
                setItemList(itemList);

                console.log(largestY);
                console.log(itemList);
            }, (error) => {
                console.log(error);
                console.log(error);
            });

        }
    }

    const handleYearChange = (event) => {
        setYearError(false);
        setYear(event.target.value);
    };

    const handleProductChange = (event) => {
        setProductError(false);
        setProduct(event.target.value);
    };

    const handlePlayerChange = (event) => {
        setPlayerError(false);
        setPlayer(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div>
            <Typography variant="h4" align="left">
                PRICE HISTORY
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField id="outlined-basic" label="Year" variant="outlined" className={classes.entry}
                               error={yearError}
                               type="number" required inputProps={{ min: "1950", max: "2020", step: "1" }}
                               defaultValue={year} onChange={handleYearChange}/>
                </div>
                <div>
                    <TextField id="outlined-basic" required label="Product" variant="outlined"
                               error={productError}
                               defaultValue={product} onChange={handleProductChange} className={classes.entry}/>
                </div>
                <div>
                    <TextField id="outlined-basic" required label="Player" variant="outlined"
                               error={playerError}
                               defaultValue={player} onChange={handlePlayerChange} className={classes.entry}/>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Grade" variant="outlined"
                               value={"PSA 10"} disabled={true}
                               className={classes.entry}/>
                </div>
                <div>
                    <Select className={classes.entry}
                            native
                            defaultValue={category}
                            onChange={handleCategoryChange}>
                        <option aria-label="None" value="" />
                        <option value={basketballCategoryId}>Basketball</option>
                        <option value={footballCategoryId}>Football</option>
                        <option value={baseballCategoryId}>Baseball</option>
                        <option value={soccerCategoryId}>Soccer</option>
                    </Select>
                </div>
                <Button variant="contained" size="large" color="primary"
                        className={classes.button} onClick={goClicked} disabled={!playerValid || !productValid || !year}>
                    GO
                </Button>
            </form>
            <Paper>
                <XYPlot
                    xType="time"
                    yDomain={[0, maxY]}
                    width={1000}
                    height={1000}
                    >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <LineSeries color="red" data={itemList}/>
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </Paper>
        </div>
    );
}