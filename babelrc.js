module.exports = {
presets: [
[
"@babel/preset-env",
{
targets: {
browsers: [">0.25%", "not dead"]
},
useBuiltIns: "usage",
corejs: 3
}
]
],
plugins: [
"@babel/plugin-transform-nullish-coalescing-operator",
"@babel/plugin-transform-numeric-separator",
"@babel/plugin-transform-class-properties",
"@babel/plugin-transform-private-property-in-object"
]
};
