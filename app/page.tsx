import classes from './page.module.sass';

export default function Home() {
  return (<>
    <div className={classes['main-wrapper']}>
      <div className={classes['nav-wrapper']}>

      </div>
      <div className={classes['content-wrapper']}>
        <p>test1</p>
      </div>
    </div>
    <div className={classes['helper-wrapper']}>
      <p>test2</p>
    </div>
  </>);
}
