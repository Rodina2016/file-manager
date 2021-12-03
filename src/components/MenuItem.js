import React from 'react'

import { getContent } from '../resourse/content'

import { List, ListItemButton } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

export default function MenuItem(props) {
    const {title, id, isChildren} = props
    const [content, setContent] = React.useState(null)
    const [open, setOpen] = React.useState(false);

    const onClick = () => {
        if(isChildren && content === null) {
            getContent(id)
                .then(res => {
                    setContent(res)
                })
        }
        setOpen(!open)
    }

    const typeFile = title.split('.')[1]

    const iconFile = React.useMemo(() => {
        switch (typeFile) {
            case 'zip':
                return <FolderZipOutlinedIcon/>
            case 'jpg':
                return <PhotoOutlinedIcon/>
            default:
                return <InsertDriveFileOutlinedIcon/>
        }
    }, [typeFile])

    return (
            <>
                <ListItemButton onClick={onClick}>
                    <ListItemIcon sx={{minWidth: 40}}>
                        {isChildren ? (
                            <FolderIcon />
                        ) : (
                            iconFile
                        )}
                    </ListItemIcon>
                    <ListItemText primary={title} />
                    {isChildren && (
                        open ? <ExpandLess /> : <ExpandMore />
                    )}
                </ListItemButton>
                {content && content.children.map(item => {
                    return (
                        <div style={{paddingLeft: 40}} key={item.id}>
                            <Collapse in={open} timeout="auto" unmountOnExit key={item.id}>
                                <List component="div" disablePadding>
                                    <MenuItem
                                        id={item.id}
                                        title={item.title}
                                        isChildren={!!item.children}
                                    />
                                </List>
                            </Collapse>
                        </div>
                    )
                })}
            </>
    )
}
