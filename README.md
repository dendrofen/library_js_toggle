
# JS TOGGLE

JS Tool for creating continues interface toggles




## Usage/Examples

```javascript
//conditions
document.addEventListener('js_toggle_after_toggle', function(e){
    let el = e.detail.el;
    let classes = el.classList;

    if(classes.contains('block--canvas')){
        window.dispatchEvent(new Event('remove_logo'));
    }
})
```

```html
<div class="icon hover-fliph js__toggle-class"
data-toggle="active"
data-toggle-document-target=".modal--back">
</div>
```


## Features

- Toggle classe functional with data attributes
- Continues toggles
- Dependency toggling
- Cross browser

