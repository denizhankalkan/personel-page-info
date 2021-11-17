export default function(theme) {
    return {
      root: {
        padding: '1em',
        color: theme.palette.text.dusk,
        borderRadius: 2,
        '& p': {
          lineHeight: 'normal',
        },
        width: '100%',
      },
      paper: {
        fontWeight: 'bold',
        height: 200,
        position: 'relative',
        boxShadow: `0 0 15px 0 ${theme.palette.secondary.main}`,
      },
      header: {
        margin: 0,
      },
      headerTitle: {
        display: 'inline',
        marginRight: 10,
        fontWeight: 600,
        marginLeft: 7,
      },
      headerItem: {
        padding: '0 !important;',
      },
      end: {
        textAlign: 'right',
        '& button, & p': {
          marginRight: 47,
        },
        '& p': {
          marginTop: 4,
        },
      },
      primary: {
        fontWeight: 600,
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'none',
        },
        marginTop: -3,
      },
      secondary: {
        fontWeight: 600,
      },
      children: {
        flexGrow: 1,
        padding: '0',
      },
    };
  