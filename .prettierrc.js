module.exports = {
  printWidth: 80, // 一行最多字符数 default 80
  tabWidth: 2, // 缩进长度 default 2
  useTabs: false, // 缩进用tab和space default false
  semi: true, // 语句后面要不要加分号 default true
  singleQuote: true, // 引号是否使用单引号 default false
  trailingComma: 'none', // 出现多行语句是要不要加逗号 取值：<none|es5|all>  default："none"
  bracketSpacing: true, // 大括号两边要不要加空格 default true
  jsxBracketSameLine: false,
  arrowParens: 'avoid', // arrow function的参数要不要圆括号 取值：<avoid|always>  default："avoid"
  parser: 'vue', // 取值：<flow|babylon|typescript|css|less|scss|json|graphql|markdown|vue> default：babylon
  filepath: './src/**/*.(js|vue)'
};
