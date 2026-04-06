
function customrender(custelement, maincontainer) {
    const createdele = document.createElement(custelement.type)
    createdele.innerHTML = custelement.children
    // createdele.setAttribute('href', custelement.props.href)
    // createdele.setAttribute('target', custelement.props.target)
    for (prop in custelement.props) {
        if (prop === "children") continue;
        createdele.setAttribute(prop, custelement.props[prop])
    }
    maincontainer.appendChild(createdele)
}

const custelement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'click me'
}

const maincontainer = document.getElementById('root')

customrender(custelement, maincontainer);