const { response } = require("express")


const isAdminRole = (req, res = response, next) => {

    if( !req.user ) {
        return res.status(500).json({
            msg: 'Role cannot be verified because token is not validated'
        })
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } dont have delete permissions`
        })
    }

    next();
}

const hasRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if( !req.user ) {
            return res.status(500).json({
                msg: 'Role cannot be verified because token is not validated'
            })
        }

        if( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `${ req.user.name } dont have delete permissions`
            })
        }
        
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}