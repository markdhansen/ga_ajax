@extends('layouts.master')
@section('scripts')
@parent
<script src="/src/js/modules/Dbm.js"></script>
@stop
@section('content')
<div class="container">
	<div class="row listings">
		<div class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-lg-9 col-lg-offset-2">
			<form class="form-horizontal" role="form">
				<div class="form-group filter">
					<div class="col-sm-12">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Filter. e.g. Page funnel" />
							<span class="input-group-btn">
								<button class="btn btn-default" type="button"><i class="fa fa-info orange"></i></button>
							</span>
						</div>
					</div>
				</div>
			</form>
			<hr />
			<div class="center">
				<h3>Most Popular</h3>
				<div class="results">65 of 212 results</div>
			</div>
			<div class="row">
				<div class="col-md-4 outbound-links">
					<div class="btn btn-default btn-block" data-toggle="collapse" data-target="#outbound-links-collapse">
						<div class="help-icons"></div>
						<h4>Outbound Links</h4>
					</div>
					<div id="outbound-links-collapse" class="collapse desc">
						<h4>Outbound Links</h4>
						This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process.
						<hr />
						<a href="funnel.html" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" title="Favorited"><i class="fa fa-star orange"></i></a>
					</div>
				</div>
				<div class="col-md-4 single-funnel">
					<div class="btn btn-default btn-block" data-toggle="collapse" data-target="#single-funnel-collapse">
						<div class="help-icons"></div>
						<h4>Single Page Funnel</h4>
					</div>
					<div id="single-funnel-collapse" class="collapse desc">
						<h4>Single Page Funnel</h4>
						This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process.
						<hr />
						<a href="/single-page-funnel" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" title="Favorited"><i class="fa fa-star orange"></i></a>
					</div>
				</div>
				<div class="col-md-4 single-funnel">
					<div class="btn btn-default btn-block" data-toggle="collapse" data-target="#single-funnel-collapse">
						<div class="help-icons"></div>
						<h4>Single Page Funnel</h4>
					</div>
					<div id="2" class="collapse desc">
						<h4>Single Page Funnel</h4>
						This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process.
						<hr />
						<a href="/ex/single-page-funnel" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" title="Favorited"><i class="fa fa-star orange"></i></a>
					</div>
				</div>
			</div>

			<!-----end row----->

			<div class="row">
				<div class="col-md-4 single-funnel">
					<div class="btn btn-default btn-block" data-toggle="collapse" data-target="#single-funnel-collapse">
						<div class="help-icons"></div>
						<h4>Single Page Funnel</h4>
					</div>
					<div class="collapse desc">
						<h4>Single Page Funnel</h4>
						This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process.
						<hr />
						<a href="/ex/single-page-funnel" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" title="Favorited"><i class="fa fa-star orange"></i></a>
					</div>
				</div>
				<div class="col-md-4 single-funnel">
					<div class="btn btn-default btn-block" data-toggle="collapse" data-target="#single-funnel-collapse">
						<div class="help-icons"></div>
						<h4>Single Page Funnel</h4>
					</div>
					<div class="collapse desc">
						<h4>Single Page Funnel</h4>
						This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process.
						<hr />
						<a href="/ex/single-page-funnel" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" title="Favorited"><i class="fa fa-star orange"></i></a>
					</div>
				</div>
				<div class="col-md-4 single-funnel">
					<div class="btn btn-default btn-block" data-toggle="collapse" data-target="#single-funnel-collapse">
						<div class="help-icons"></div>
						<h4>Single Page Funnel</h4>
					</div>
					<div class="collapse desc">
						<h4>Single Page Funnel</h4>
						This example illustrates how to use Google Analytics virtual pageviews to create a funnel that tracks conversion success for a multi-step account creation process.
						<hr />
						<a href="/ex/single-page-funnel" class="btn btn-default">Open example <i class="fa fa-caret-right"></i></a>  <a href="#" class="btn btn-default" title="Favorited"><i class="fa fa-star orange"></i></a>
					</div>
				</div>
			</div>
			<hr />
			<a href="javascript:void(0);" class="btn btn-default btn-block">Load more <i class="fa fa-caret-down"></i></a>
		</div>
	</div>
</div>
@stop
