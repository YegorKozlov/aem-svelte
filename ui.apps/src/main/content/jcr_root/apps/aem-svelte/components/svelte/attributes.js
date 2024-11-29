use(function () {
    const attrs = {
    };

    const attrNode = resource.getChild("attributes");
    if(attrNode != null) {
        const chidlren = attrNode.listChildren();
        for(let i=0; i<chidlren.length; i++) {
            const child = chidlren[i];
            const props = child.adaptTo(Packages.org.apache.sling.api.resource.ValueMap);
            const key = props.get("_name", "");
            const value = props.get("value", "");
            if(key != null && value != null) {
                attrs[key] = value;
            }
        }
    }

    return attrs;
});