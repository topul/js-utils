# 数字转金额

## 1、正则

```javascript
const n = 1234567
n.toFixed(2).replace(/\d(?=(\d{3})+\.)/, '$&,')  // 1,234,567
```

## 2、Intl函数

```javascript
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
formatter.format(2500) // $2,500.00
```

## 3、toLocalString

```javascript
(2500).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
}); /* $2,500.00 */
```

## 4、普通函数

```javascript
function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};
```
