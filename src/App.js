import React from 'react'
import './App.css';
import { getContent } from './resourse/content'
import MenuItem from './components/MenuItem'

function App() {
    const [content, setContent] = React.useState(null)

    React.useEffect(() => {
        getContent()
            .then(res => {
                setContent(res)
            })
    }, [])

    return (
        <div className='App'>
            <h1>
                Digital Habits. Entrance test
            </h1>
            <div className='Container'>
                {content && content.children.map(item => {
                    return (
                        <MenuItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            isChildren={!!item.children}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
