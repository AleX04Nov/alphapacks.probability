(function() {
  /**
   * Корректировка округления десятичных дробей.
   *
   * @param {String}  type  Тип корректировки.
   * @param {Number}  value Число.
   * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
   * @returns {Number} Скорректированное значение.
   */
  function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Десятичное округление к ближайшему
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Десятичное округление вниз
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Десятичное округление вверх
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();


function product_Range(a,b) {
  var prd = a,i = a;
 
  while (i++< b) {
    prd*=i;
  }
  return prd;
}


function combinations(n, r) 
{
  if (n==r || r==0) 
  {
    return 1;
  }
  else 
  {
    r=(r < n-r) ? n-r : r;
    return product_Range(r+1, n)/product_Range(1,n-r);
  }
}


function alpha_pack2(x, add_win, add_loss, win){
	var main_list = Array.from({length: x}, (v, k) => k+1); 
	var global_probability = 0;
	var delta_chances = add_win - add_loss;
	for (var i = 0; i <= x; i++){
		probability = 0;
		if ( (x & 1) == 1){
			if ( (i & 1) == 1)
				var indexes_arr = [main_list.slice( ((x / 2) >> 0) - ((i / 2) >> 0), ((x / 2) >> 0) + ((i / 2) >> 0) + 1 )];
			else
				var indexes_arr = [main_list.slice( ((x / 2) >> 0) - ((i / 2) >> 0), ((x / 2) >> 0) + ((i / 2) >> 0)), main_list.slice( ((x / 2) >> 0) - ((i / 2) >> 0) + 1, ((x / 2) >> 0) + ((i / 2) >> 0) + 1)];
		}
		else{
			if ( (i & 1) == 0)
				var indexes_arr = [main_list.slice( ((x / 2) >> 0) - ((i / 2) >> 0), ((x / 2) >> 0) + ((i / 2) >> 0))];
			else
				var indexes_arr = [main_list.slice( ((x / 2) >> 0) - ((i / 2) >> 0) - 1, ((x / 2) >> 0) + ((i / 2) >> 0)), main_list.slice( ((x / 2) >> 0) - ((i / 2) >> 0), ((x / 2) >> 0) + ((i / 2) >> 0) + 1)];
		}
		if (i == 0)
			indexes_arr = [[]];
		for (var j = 0; j < indexes_arr.length; j++){
			var local_probability = 1;
			var elem = indexes_arr[j];
			for (var k = 0; k < elem.length; k++){
				var chance = (elem[k] * add_loss) + ((k + 1) * delta_chances);
				local_probability *= 1 - chance;
				if (chance > 1){
					local_probability = 0;
					break;
				}
			}
			probability += local_probability;
		}
		
		global_probability += probability/(indexes_arr.length) * (Math.pow(win, i)) * (Math.pow(1 - win, x - i)) * (Math.min((x + 1) * add_loss + (i + 1) * delta_chances, 1)) * win * combinations(x, i);
	}
	return global_probability
}